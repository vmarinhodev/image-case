import { getAuthenticatedUser } from "@/app/auth/authUser";
import { fetchImagesWithFavourites } from "../actions/fetchImagesWithFavourites";
import ImageGrid from "@/components/custom/ImageGrid";

export default async function Private() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return <div>You need to be logged in to see this page.</div>
  }

  const { images: privateImages } = await fetchImagesWithFavourites(user, { onlyPrivate: true, fetchFavourites: true });

    return (
      <main className="min-h-screen relative p-10">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-4">Private</h1>
          </div>
          <div className="w-full">
            <ImageGrid
              user={user}
              images={privateImages}
              showHearted={true}
              showEdit={true}
              noDataMessage="You have NO private images to display"
            />
          </div>
        </div>
      </main>
    );
};