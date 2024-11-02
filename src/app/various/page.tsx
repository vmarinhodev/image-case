import { getAuthenticatedUser } from "@/app/auth/authUser";
import ImageGallery from "@/components/custom/ImageGalleryTest";

export default async function Private() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return <div>You need to be logged in to see this page.</div>
  }


    return (
      <main className="min-h-screen relative p-10">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-4">Various</h1>
          </div>
          <div className="w-full">
            <ImageGallery 
              params={{
                id: user.id
              }}
            />
          </div>
        </div>
      </main>
    );
};