'use client'
import { ImageGridPropsInterface } from "@/app/types";
import Photo from "./Photo";


// Image Grid Display
export default function ImageGrid({
    user,
    images,
    showHearted = false,
    showPrivate = false,
    noDataMessage,
    showEdit = false,
}: ImageGridPropsInterface) {

    // Fallback in case there are no images returned from fetchImages
    if (!images.length) return <div>{noDataMessage || 'No images available'}</div>

    // Images that have been favourited
    const displayedImages = images.filter((photo) => {
        
        const isFavouritedCondition = photo.isFavourited === true;
        const isShowAllCondition = showHearted && isFavouritedCondition;
        const isPrivateCondition = 
            photo.privacy === false ||
            (photo.privacy === true && showPrivate && photo.owner === user.id)
        return isFavouritedCondition || isShowAllCondition || isPrivateCondition;
    });

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
                        objectId={photo.objectId}
                        alt={photo.title}
                        title={photo.title}
                        description={photo.description}
                        isFavourited={photo.isFavourited}
                        ownerId={photo.owner}
                        currentUserId={user.id}
                        ownerName={photo.ownerName}
                        showEdit={showEdit}
                        editingImageId={photo.imageId}
                    />
                ))
            }
        </div>
        </>
    )
}