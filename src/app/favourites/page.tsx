import { getAuthenticatedUser } from "@/app/auth/authUser";
import ImageGrid from "@/components/custom/ImageGrid";
import { fetchImagesWithFavourites } from "../actions/fetchImagesWithFavourites";

export default async function Favourites() {
    const user = await getAuthenticatedUser();

    if (!user) {
        return <div>You need to be logged in to see this page.</div>
    }
    
    const { images: personalImages } = await fetchImagesWithFavourites(user, { fetchFavourites: true, allFavourited: true});

    return (
        <main className="min-h-screen relative p-10">
            <div className="container mx-auto">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold mb-4">Favourites</h1>
                </div>
                <div className="w-full">
                    <ImageGrid
                        user={user}
                        images={personalImages}
                        showHearted={true}
                        showEdit={false}
                        noDataMessage="You have NO favourite images yet."
                    />
                </div>
            </div>
        </main>
    )
}