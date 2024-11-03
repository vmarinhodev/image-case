import { getAuthenticatedUser } from "./auth/authUser";
import ImageGrid from "@/components/custom/ImageGrid";
import { fetchImagesWithFavourites } from "./actions/fetchImagesWithFavourites";
import AuthFormsTabs from "@/components/custom/AuthFormsTab";

export default async function Home() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return (
      <div className="w-full h-screen flex md:grid md:grid-cols-5">
  {/* Left Column */}
  <div className="flex items-center justify-center py-12 col-span-2 px-8">
    <div className="mx-auto grid max-w-[540px] gap-6">
      <div className="grid gap-2 text-left">
        <AuthFormsTabs />
      </div>
    </div>
  </div>

  {/* Right Column */}
  <div className="hidden md:flex col-span-3 h-screen bg-black items-center justify-center text-white">
    <div className="mx-auto grid max-w-[540px] gap-4 text-center">
      <h1 className="text-3xl font-bold">Sign Up!</h1>
      <p className="text-balance">
        Save, delete and heart all your pictures on this fantastic app.
      </p>
    </div>
  </div>
</div>
    )
  }

  const { images: allImages } = await fetchImagesWithFavourites(user, { fetchFavourites: true });

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
            showHearted={true}
            showEdit={false}
            noDataMessage="No images found try and upload a new Image "
          />
        </div>
      </div>
    </main>
  )
}
