import { getAuthenticatedUser } from "@/app/auth/authUser";
import { fetchImagesWithFavourites } from "../actions/fetchImagesWithFavourites";
import ImageGrid from "@/components/custom/ImageGrid";
import NoSignedUser from "../nouser/page"; // Assuming this is a page for non-signed users

export default async function Private() {
  const user = await getAuthenticatedUser();

  if (!user) {
    // If user is not authenticated, redirect or return a NoSignedUser layout
    return <NoSignedUser noUserText="You must be logged in to see this page." />;
  }

  // Fetch private images if the user is authenticated
  const { images: privateImages } = await fetchImagesWithFavourites(user, { onlyPrivate: true, fetchFavourites: true });

  return (
    
      <ImageGrid
        user={user}
        images={privateImages}
        showHearted={true}
        showEdit={true}/>
    
  );
}