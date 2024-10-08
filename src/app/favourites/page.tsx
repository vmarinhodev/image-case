/* eslint no-use-before-define: 2 */  // --> ON
import { supabaseServer } from "@/utils/supabase/server"


interface UserProps {
    id?: string;
}

const supabase = supabaseServer();
async function fetchFavouritePhotos(user: UserProps) {
    
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
    const { data: { user }, } = await supabase.auth.getUser();
    if (!user) {
        return <div>User is not authenticated</div>
    }
    const favouritedPhotos = await fetchFavouritePhotos({ id: user.id });
    return (
        <main className="container mx-auto py-6">
            <div>
                {favouritedPhotos?.map((photo) => {
                    return (
                        <div key={photo.id}>

                        </div>
                    )
                })}
            </div>
        </main>
    )
}