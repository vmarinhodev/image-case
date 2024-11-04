import { getAuthenticatedUser } from "@/app/auth/authUser";
import ImageGrid from "@/components/custom/ImageGrid";
import { fetchImagesWithFavourites } from "../actions/fetchImagesWithFavourites";
import { User } from "@supabase/supabase-js";
import GlobalLayout from "@/components/custom/GlobalLayout";

export default async function Favourites() {
    const user = await getAuthenticatedUser();
    
    const { images: favouriteImages } = await fetchImagesWithFavourites(user as User, { fetchFavourites: true, allFavourited: true});

    return (
        <GlobalLayout user={user} images={favouriteImages}>
        <main className="min-h-screen relative p-10">
            <div className="container mx-auto">
                <div className="w-full">
                    <ImageGrid
                        user={user}
                        images={favouriteImages}
                        showHearted={true}
                        showEdit={false}
                        noDataMessage="You have NO favourite images yet."
                    />
                </div>
            </div>
        </main>
        </GlobalLayout>
    )
}