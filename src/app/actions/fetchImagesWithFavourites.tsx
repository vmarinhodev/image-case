import { User } from "@supabase/supabase-js";
import { fetchAllImages, fetchUserFavouriteImages, getImageUrls } from "./fetchImages";
import { FetchImagesInterface, SignedImageUrlInterface } from "../types";


export async function fetchImagesWithFavourites(
    user: User,
    {   fetchFavourites = false,
        allPersonal = false,
        allFavourited = false,
        onlyPrivate = false,
        onlyPublic = false
    }: FetchImagesInterface,
) {
    //Fetch all images for the user
    const allImages = await fetchAllImages(user);
    if (!allImages?.length) {
        return { images: [], noData: true};
    }

    // Fetch favourites only if needed
    let favouriteImageNames: string[] = [];
    if (fetchFavourites) {
        favouriteImageNames = await fetchUserFavouriteImages(user);
    }

    const photoObjects = await getImageUrls(allImages, user);

    const imagesWithFavourites: SignedImageUrlInterface[] = photoObjects
        .filter((photo): photo is SignedImageUrlInterface => photo !== null)
        .map((photo) => ({
            ...photo,
            isFavourited: favouriteImageNames.includes(photo.objectId)
        }))
        .filter((photo) => {
            if (allPersonal) return photo.owner === user.id;
            if (allFavourited) return photo.isFavourited === true;
            if (onlyPrivate) return photo.privacy === true && photo.owner === user.id;
            if (onlyPublic) return photo.privacy === true;
            return true;
        });

        return { images: imagesWithFavourites, noData: false }
}