import { getAuthenticatedUser } from "@/app/auth/authUser";
import ImageGallery from "@/components/custom/ImageGalleryTest";
import NoSignedUser from "../nouser/page";

export default async function Various() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return <NoSignedUser params={{ noUserText: "You must be logged in to see this page"}}/>
  }

    return (
      <main className="min-h-screen relative p-10 pt-16">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-4">Various</h1>
          </div>
          <div className="w-full">
            <ImageGallery 
              params={{
                userId: user.id,
                imageName: 'image_name', 
              }}
            />
          </div>
        </div>
      </main>
    );
};