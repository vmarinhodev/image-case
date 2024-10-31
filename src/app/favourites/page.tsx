import { getAuthenticatedUser } from "@/app/auth/authUser";
import ImageGrid from "@/components/custom/ImageGrid";
import { fetchAllImages, fetchUserFavouriteImages, getImageUrls } from "../actions/fetchImages";
import { ImageInterface, SignedImageUrlInterface } from "../types";


export default async function Favourites() {
    const user = await getAuthenticatedUser();

    if (!user) {
        return <div>You need to be logged in to see this page.</div>
    }

    // Fetch the user's favorite images names
    const favouriteImageNames = await fetchUserFavouriteImages(user);
    const allImages: ImageInterface[] = await fetchAllImages(user) || [];
    const favouriteImages: ImageInterface[] = allImages
        .filter((img) => favouriteImageNames.includes(img.object_id)
        )

    // Get the URLs for the favorite images
    const photoObjects: (SignedImageUrlInterface | null)[] = await getImageUrls(favouriteImages, user);

    const validPhotoObjects: SignedImageUrlInterface[] = photoObjects.filter(
        (photo): photo is SignedImageUrlInterface => photo !== null
    ).map((img) => ({
        ...img,
        isFavourited: true,
    }))

    return (
        <main className="min-h-screen relative p-10">
            <div className="container mx-auto">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold mb-4">Favourites</h1>
                </div>
                <div className="w-full">
                    <ImageGrid
                        user={user}
                        showHearted={true}
                        showPrivate={true}
                        showEdit={false}
                        noDataMessage="You have NO favourite images yet."
                        images={validPhotoObjects}
                    />
                </div>
            </div>
        </main>
    )
}