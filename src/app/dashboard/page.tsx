
import { getAuthenticatedUser } from "@/app/auth/authUser";
import { fetchImagesWithFavourites } from "../actions/fetchImagesWithFavourites";
import ImageGrid from "@/components/custom/ImageGrid";
import { User } from "@supabase/supabase-js";
import GlobalLayout from "@/components/custom/GlobalLayout";

export default async function Dashboard() {
    const user = await getAuthenticatedUser();

    const { images: allImages } = await fetchImagesWithFavourites(user as User, { fetchFavourites: true });

    return (
        <GlobalLayout user={user} images={allImages}>
            <main className="min-h-screen relative p-10">
                <div className="container mx-auto">
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
        </GlobalLayout>
    );
};