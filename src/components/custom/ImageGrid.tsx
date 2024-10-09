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

interface ImageGridProps {
    favourites?: boolean;
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
};


//Fetch favourite Photos
async function fetchFavouritePhotos(user: User) {
    const supabase = supabaseServer();
    const response = await supabase
        .from('favourites')
        .select('image_name')
        .eq('user_id', user.id)

    if (response.error) {
        throw new Error(`Error: ${response.error.message}`)
    }
    
    return (response?.data.map((favourite) => favourite.image_name))
}

export default async function ImageGrid({favourites = false}: ImageGridProps) {
    console.log('favourites flag:', favourites); // Check what is being passed
    
    const supabase = supabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return <div>No user found</div>

    const photos = await fetchUserPhotos(user as User);
    if (!photos) return <div>No images found</div>

    const photoObjects = await getPhotoUrls(photos, user);
    const favouritePhotoNames = await fetchFavouritePhotos(user as User);
    
    const photoWithFavourites = photoObjects
        .filter((photo): photo is SignedPhotoUrl => (photo !== null))
        .map((photo) => ({
            ...photo,
            isFavourited: favouritePhotoNames.includes(photo.photoName)
        }))

        // console.log('favourites flag:', favourites);
        // console.log('photoWithFavourites:', photoWithFavourites);
        
    const displayedImages = favourites
        ? photoWithFavourites.filter(photo => photo.isFavourited)
        : photoWithFavourites;
        // console.log('Displayed Images:', displayedImages);
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {
                displayedImages.map((photo) => (
                    <Photo
                        key={photo.photoName}
                        src={photo.url}
                        alt={`Photo ${photo.photoName}`}
                        width={200}
                        height={200}
                        photoName={photo.photoName}
                        isFavourited={photo.isFavourited}
                    />
                ))
            }
        </div>
    )
}