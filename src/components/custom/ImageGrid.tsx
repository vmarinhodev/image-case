'use client'
import { ImageGridPropsInterface } from "@/app/types";
import Photo from "./Photo";


// Image Grid Display
export default function ImageGrid({
    user,
    images,
    favourites = false,
    showHearted = false,
    showPrivate = false,
    noDataMessage,
    showEdit = false,
}: ImageGridPropsInterface) {

    if (!images.length) return <div>{noDataMessage || 'No images available'}</div>
    const userName = user?.user_metadata?.display_name;

    // Images that have been favourited
    const displayedImages = images.filter((photo) => {
        // console.log('photo image Grid', photo)
        const isFavouritedCondition = favourites ? photo.isFavourited : true;
        const isShowAllCondition = showHearted;


        const isPrivateCondition = 
            photo.privacy === false ||
            (photo.privacy === true && showPrivate && photo.owner === user.id)

        return isFavouritedCondition && isShowAllCondition && isPrivateCondition;
    })

    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                displayedImages.map((photo, index) => (
                    <Photo
                        key={index}
                        src={photo.image_url}
                        imageName={photo.imageName}
                        imageId={photo.imageId}
                        alt={photo.title}
                        title={photo.title}
                        description={photo.description}
                        isFavourited={photo.isFavourited}
                        ownerId={photo.owner}
                        currentUserId={user.id}
                        userDisplayName={userName}
                        showEdit={showEdit}
                        editingImageId={photo.imageId}
                    />
                ))
            }
        </div>
        </>
    )
}