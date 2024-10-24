
import { getAuthenticatedUser } from "@/app/auth/authUser";
import ImageGrid from "@/components/custom/ImageGrid";
import { fetchImagesWithFavourites } from "../actions/fetchImagesWithFavourites";

export default async function Dashboard() {
    const user = await getAuthenticatedUser();

    if (!user) {
        return <div>You need to be logged in to see this page.</div>
    }

    const { images: allImages } = await fetchImagesWithFavourites(user, { fetchFavourites: true });

    if (!allImages.length) {
        return <div>No Images found.</div>
    }

    return (
        <main className="min-h-screen relative p-10">
            <div className="container mx-auto">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold mb-4">DashBoard</h1>
                </div>
                <div className="w-full">
                    <ImageGrid
                        user={user}
                        images={allImages}
                        favourites={false}
                        showHearted={true}
                        showPrivate={true}
                        noDataMessage="No images found"
                    />
                </div>
            </div>
        </main>
    );
};