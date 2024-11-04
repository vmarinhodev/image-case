import { getAuthenticatedUser } from "@/app/auth/authUser";
import { fetchImagesWithFavourites } from "../actions/fetchImagesWithFavourites";
import ImageGrid from "@/components/custom/ImageGrid";
import GlobalLayout from "@/components/custom/GlobalLayout";
import { User } from "@supabase/supabase-js";

export default async function Personal() {
  const user = await getAuthenticatedUser();
  const { images: personalImages } = await fetchImagesWithFavourites(user as User, { allPersonal: true, fetchFavourites: true });

    return (
      <GlobalLayout user={user} images={personalImages}>
      <main className="min-h-screen relative p-10">
        <div className="container mx-auto">
          <div className="w-full">
            <ImageGrid
              user={user}
              images={personalImages}
              showHearted={true}
              showEdit={true}
              noDataMessage="You have NO personal images yet."
            />
          </div>
        </div>
      </main>
      </GlobalLayout>
    );
};