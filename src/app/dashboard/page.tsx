
import { getAuthenticatedUser } from "@/app/auth/authUser";
import { fetchImagesWithFavourites } from "../actions/fetchImagesWithFavourites";
import ImageGrid from "@/components/custom/ImageGrid";

export default async function Dashboard() {
    const user = await getAuthenticatedUser();

    if (!user) {
        return <div>You need to be logged in to see this page.</div>
    }

    const { images: allImages } = await fetchImagesWithFavourites(user, { fetchFavourites: true });

    return (
        <main className="min-h-screen relative p-10">
            <div className="container mx-auto">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
                </div>
                <div className="w-full">
                    <ImageGrid
                        user={user}
                        images={allImages}
                        showHearted={true}
                        showEdit={false}
                        noDataMessage="There are No images to be displayed in your Dashboard"
                    />
                </div>
            </div>
        </main>
    );
};