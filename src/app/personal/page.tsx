import { getAuthenticatedUser } from "@/app/auth/authUser";
import { fetchImagesWithFavourites } from "../actions/fetchImagesWithFavourites";
import ImageGrid from "@/components/custom/ImageGrid";

export default async function Personal() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return <div>You need to be logged in to see this page.</div>
  }

  const { images: personalImages } = await fetchImagesWithFavourites(user, { allPersonal: true, fetchFavourites: true });

    return (
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
    );
};