import { getAuthenticatedUser } from "@/app/auth/authUser";
import { fetchImagesWithFavourites } from "../actions/fetchImagesWithFavourites";
import ImageGrid from "@/components/custom/ImageGrid";
import GlobalLayout from "@/components/custom/GlobalLayout";
import { User } from "@supabase/supabase-js";

export default async function Private() {
  const user = await getAuthenticatedUser();

  // Fetch private images if the user is authenticated
  const { images: privateImages } = await fetchImagesWithFavourites(user as User, { onlyPrivate: true, fetchFavourites: true });

  return (
    <GlobalLayout user={user} images={privateImages}>
    <main className="min-h-screen relative p-10">
      <div className="container mx-auto">
        <div className="w-full">
          <ImageGrid
            user={user}
            images={privateImages}
            showHearted={true}
            showEdit={true}
          />
        </div>
      </div>
    </main>
    </GlobalLayout>
  );
}