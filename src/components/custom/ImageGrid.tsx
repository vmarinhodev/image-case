import { supabaseServer } from "@/utils/supabase/server";
import Photo from "./Photo";

interface UserProps {
    id?: string;
}

interface PhotoProps {
    name: string;
    url: string;
    width: number;
    height: number;
    photoName: string;
    alt: string;
    user: UserProps;
}

const supabase = supabaseServer();

async function fetchUserPhotos(user: UserProps): Promise<PhotoProps[]> {
    if (!user.id) return []; // Check if user.id is defined

    const folderPath = `user_uploads/${user.id}/`;
    const { data, error } = await supabase.storage
        .from('photos')
        .list(folderPath);

    if (error) {
        console.log('Error fetching photos', error);
        return [];
    }
    return data as PhotoProps[]; // Type assertion
}

async function getPhotoUrls(photos: PhotoProps[], user: UserProps): Promise<{ url: string; photoName: string }[]> {
    return Promise.all(photos.map(async (photo) => {
        const { data, error } = await supabase.storage
            .from('photos')
            .createSignedUrl(`user_uploads/${user.id}/${photo.name}`, 60 * 60);
        if (error) {
            console.error('Error generating url', error);
            return null; // Return null for error case
        }
        return { url: data.signedUrl, photoName: photo.name };
    })).then((results) => results.filter((url) => url !== null) as { url: string; photoName: string }[]); // Filter out null values
}

export default async function ImageGrid(): Promise<JSX.Element | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null; // Return null instead of an empty array
    const photos = await fetchUserPhotos(user);
    const photoObjects = await getPhotoUrls(photos, user);

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {photoObjects.map((photo) => (
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
            ))}
        </div>
    );
}
