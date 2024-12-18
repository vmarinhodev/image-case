import { supabaseServer } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { ImageInterface, SignedImageUrlInterface } from "../types";

// Fetch ALL Images
export async function fetchAllImages(user: User): Promise<ImageInterface[] | null> {
    const supabase = supabaseServer();
    if (!user) return [];

    const { data, error } = await supabase
        .from('images')
        .select()
        .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching images', error.message);
            return []
        }
        return data as ImageInterface[];
}

//Fetch user favourite Images
export async function fetchUserFavouriteImages(user: User): Promise<string[]> {
    const supabase = supabaseServer();
    const response = await supabase
        .from('favourites')
        .select('object_id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (response.error) {
        throw new Error(`Error: ${response.error.message}`)
    }
    
    return (response?.data.map((favourite) => favourite.object_id))
}

// Get user Images Urls
export async function getImageUrls(photos: ImageInterface[], user: User): Promise<(SignedImageUrlInterface | null)[]> {
    const supabase = supabaseServer();
    if (!user) return [];

    return Promise.all(photos.map(async (photo) => {
        const filePath = `users_folder/${photo.id}/${photo.image_url}`;
        
        const { data, error } = await supabase
            .storage
            .from('allimages')
            .createSignedUrl(filePath, 60 * 60)

        if (error) {
            console.error('Error generating url', error)
            return null;
        }

        return {
            image_url: data.signedUrl ?? '',
            imageName: photo.image_url,
            title: photo.title,
            privacy: photo.public,
            owner: photo.user_id,
            ownerName: photo.user_name,
            description: photo.description,
            imageId: photo.id,
            objectId: photo.object_id,
        };
    }));
};

