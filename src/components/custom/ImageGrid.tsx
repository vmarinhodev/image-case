import { User } from '@supabase/supabase-js'
import { supabaseServer } from "@/utils/supabase/server"
import Photo from "./Photo";

interface ImageInterface {
    id: string;
    user_id: string;
    image_url: string;
    title: string;
    public: boolean;
}

interface SignedImageUrl {
    url: string;
    photoName: string;
    privacy: boolean;
    owner: string;
}

interface ImageGridProps {
    favourites?: boolean;
    showHearted: boolean;
    showPrivate: boolean;
}

// Fetch Images from user
async function fetchAllImages(user: User): Promise<ImageInterface[] | null> {
    const supabase = supabaseServer();
    if (!user) return [];

    const { data, error } = await supabase
        .from('images')
        .select()

    if (error) {
        console.error('Error fetching photos', error)
        return null;
    }

    return data as ImageInterface[];
}

// Get user Images Urls
async function getImageUrls(photos: ImageInterface[], user: User): Promise<(SignedImageUrl | null)[]> {
    const supabase = supabaseServer();
    if (!user) return [];

    return Promise.all(photos.map(async (photo) => {
        const { data, error } = await supabase
            .storage
            .from('allimages')
            .createSignedUrl(`users_folder/${photo.image_url}`, 60 * 60)

        if (error) {
            console.error('Error generating url', error)
            return null;
        }

        return {
            url: data.signedUrl ?? '',
            photoName: photo.title,
            id: photo.id,
            privacy: photo.public,
            owner: photo.user_id
        };
    }));
};


//Fetch user favourite Images
async function fetchUserFavouriteImages(user: User) {
    const supabase = supabaseServer();
    const response = await supabase
        .from('favourites')
        .select('image_name')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (response.error) {
        throw new Error(`Error: ${response.error.message}`)
    }
    return (response?.data.map((favourite) => favourite.image_name))
}

// Image Grid Display
export default async function ImageGrid({ favourites = false, showHearted = false, showPrivate = false }: ImageGridProps) {

    // Get data from server
    const supabase = supabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return <div>No user found</div>

    // Fetch Single user Images
    const userPhotos = await fetchAllImages(user as User);
    console.log('userPhotos', userPhotos)
    if (!userPhotos?.length) return <div>No images found</div>

    const photoObjects = await getImageUrls(userPhotos, user);
    const favouritePhotoNames = await fetchUserFavouriteImages(user as User);

    // Check if user has any favourites
    // if (!favouritePhotoNames.length) return <div>You have no favourite photos yet.</div>

    // Images that have been favourited
    const photoWithFavourites = photoObjects
        .filter((photo): photo is SignedImageUrl => (photo !== null))
        .map((photo) => ({
            ...photo,
            isFavourited: favouritePhotoNames.includes(photo.photoName),
        }))

        const displayedImages = photoWithFavourites.filter((photo) => {
        const isFavouritedCondition = favourites ? photo.isFavourited : true;
        const isShowAllCondition = showHearted;

        const isPrivateCondition = 
            photo.privacy === false ||
            (photo.privacy === true && showPrivate && photo.owner === user.id)

        return isFavouritedCondition && isShowAllCondition && isPrivateCondition;
    })

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {
                displayedImages.map((photo) => (
                    <Photo
                        key={photo.photoName}
                        src={photo.url}
                        alt={photo.photoName}
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