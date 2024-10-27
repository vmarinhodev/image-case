import { getAuthenticatedUser } from "@/app/auth/authUser";
import ImageGrid from "@/components/custom/ImageGrid";
import { fetchImagesWithFavourites } from "../actions/fetchImagesWithFavourites";

export default async function Personal() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return <div>You need to be logged in to see this page.</div>
  }

  const { images: privateImages } = await fetchImagesWithFavourites(user, { onlyPrivate: true });

  if (!privateImages.length) {
    return <div>No private images to display.</div>
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
              images={privateImages}
              favourites={false}
              showHearted={true}
              showPrivate={true}
              showEdit={true}
              noDataMessage="You have NO private images"
            />
          </div>
        </div>
      </main>
    );
};