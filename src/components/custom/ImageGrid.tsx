import { User } from '@supabase/supabase-js'
import { supabaseServer } from "@/utils/supabase/server"
import Photo from "./Photo";

interface PhotoInterface {
    name: string;
}

interface SignedPhotoUrl {
    url: string;
    photoName: string;
}



async function fetchUserPhotos(user: User): Promise<PhotoInterface[] | null> {
    const supabase = supabaseServer();
    if (!user) return null;

    const folderPath = `user_uploads/${user.id}/`
    const { data, error } = await supabase.storage
        .from('photos')
        .list(folderPath)

    if (error) {
        console.log('Error fetching photos', error)
        return null;
    }
    return data as PhotoInterface[];
}

async function getPhotoUrls(photos: PhotoInterface[], user: User): Promise<(SignedPhotoUrl | null)[]> {
    const supabase = supabaseServer();
    return Promise.all(photos.map(async (photo) => {
        const { data, error } = await supabase.storage
            .from('photos')
            .createSignedUrl(`user_uploads/${user.id}/${photo.name}`, 60 * 60)
        
            if (error) {
            console.error('Error generating url', error)
            return null;
        }
        return { url: data.signedUrl ?? '', photoName: photo.name };
    }));
}

export default async function ImageGrid() {
    const supabase = supabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return <div>No user found</div>

    const photos = await fetchUserPhotos(user);
    if (!photos) return <div>No images found</div>

    const photoObjects = await getPhotoUrls(photos, user);

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {
                photoObjects.map((photo) => (
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
                ))
            }
        </div>
    )
}