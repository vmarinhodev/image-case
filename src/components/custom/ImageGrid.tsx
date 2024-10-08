import { supabaseServer } from "@/utils/supabase/server"
import Photo from "./Photo";

const supabase = supabaseServer();
async function fetchUserPhotos(user) {
    if (!user) return;

    const folderPath = `user_uploads/${user.id}/`
    const { data, error } = await supabase.storage
        .from('photos')
        .list(folderPath)

    if (error) {
        console.log('Error fetching photos', error)
        return
    }
    return data;
}

async function getPhotoUrls(photos, user) {
    console.log('types', typeof photos, typeof user )
    return Promise.all(photos.map(async (photo) => {
        const { data, error } = await supabase.storage
            .from('photos')
            .createSignedUrl(`user_uploads/${user.id}/${photo.name}`, 60 * 60)
        if (error) {
            console.error('Error generating url', error)
            return null
        }
        return { url: data.signedUrl, photoName: photo.name }
        
    }))
}

export default async function ImageGrid() {

    const { data: { user } } = await supabase.auth.getUser();
    const photos = await fetchUserPhotos(user);
    const photoObjects = await getPhotoUrls(photos, user);

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {
                photoObjects.map((photo) => (
                    <Photo
                        key={photo.photoName}
                        src={photo.url}
                        alt={`Photo ${photo.photName}`}
                        width={200}
                        height={200}
                        photoName={photo.photoName}
                    />
                ))
            }
        </div>
    )

}