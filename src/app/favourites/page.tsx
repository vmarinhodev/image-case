import { supabaseServer } from "@/utils/supabase/server"
import Photo from "@/components/custom/Photo";

interface UserProps {
    id?: string;
}


async function fetchFavouritePhotos(user: UserProps) {
    const supabase = supabaseServer();
    
    const { data, error } = await supabase
        .from('favourites')
        .select('image_id')
        .eq('user_id', user.id)

    if (error) {
        console.error(`Error fetching favourites`, error)
        return
    }

    return data.map((favourite) => favourite.image_id)
}

export default async function Favourites() {
    const supabase = supabaseServer();
    const { data: { user }, } = await supabase.auth.getUser();
    if (!user) {
        return <div>User is not authenticated</div>
    }
    const favouritedPhotos = await fetchFavouritePhotos({ id: user.id });
    return (
        <main className="container mx-auto py-6">
            <h1>Favourites</h1>
            <div>
                {favouritedPhotos?.map((photo) => {
                    return (
                        photo && (
                            <Photo
                                key={photo.photoName}
                                src={photo.url}
                                alt={`Photo ${photo.photoName}`}
                                width={200}
                                height={200}
                                photoName={photo.photoName}
                            />
                        )
                    )
                })}
            </div>
        </main>
    );
};