import { getAuthenticatedUser } from "./auth/authUser";
import ImageGrid from "@/components/custom/ImageGrid";
import { fetchImagesWithFavourites } from "./actions/fetchImagesWithFavourites";
import AuthFormsTabs from "@/components/custom/AuthFormsTab";

export default async function Home() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return (
      <div className="w-full lg:grid lg:grid-cols-5 h-[calc(100vh-52px)] flex sm:items-center sm:justify-center sm:grid">
        <div className="flex items-center justify-center py-12 col-span-2 px-8">
          <div className="mx-auto grid max-w-[540px] gap-6">
            <div className="grid gap-2 text-left">
              <AuthFormsTabs />
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block col-span-3 h-[calc(100vh-52px)] bg-gradient-to-t from-green-50 via-pink-100 to-purple-100">
          <div className="flex items-center justify-center py-12 col-span-2 px-4">
            <div className="mx-auto grid max-w-[540px] gap-4">
              <h1 className="text-3xl font-bold">Sign Up!</h1>
              <p className="text-balance text-muted-foreground">
                Save, delete and heart all your pictures on this fantastic app.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { images: allImages } = await fetchImagesWithFavourites(user, { fetchFavourites: true });

  if (!allImages.length) {
    return <div>No Images found.</div>
  }

  return (
    <main className="min-h-screen relative p-10">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4">Home</h1>
        </div>
        <div className="w-full">
          <ImageGrid
            user={user}
            images={allImages}
            favourites={false}
            showHearted={true}
            showPrivate={true}
            noDataMessage="No images found"
          />
        </div>
      </div>
    </main>
  )
}
