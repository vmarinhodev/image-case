import { getAuthenticatedUser } from "@/app/auth/authUser";
import ImageGrid from "@/components/custom/ImageGrid";
import { fetchImagesWithFavourites } from "../actions/fetchImagesWithFavourites";
import NoSignedUser from "../nouser/page";

export default async function Favourites() {
    const user = await getAuthenticatedUser();

    if (!user) {
        // If user is not authenticated, redirect or return a NoSignedUser layout
        return <NoSignedUser noUserText="You must be logged in to see this page." />;
      }
    
    const { images: personalImages } = await fetchImagesWithFavourites(user, { fetchFavourites: true, allFavourited: true});

    return (
        <main className="min-h-screen relative p-10">
            <div className="container mx-auto">
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