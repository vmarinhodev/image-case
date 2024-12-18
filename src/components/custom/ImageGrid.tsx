'use client'
import { ImageGridPropsInterface } from "@/app/types";
import Photo from "./Photo";
import NoDataLayout from "./NoDataLayout";
import LoadingCard from "./LoadingCard";


// Image Grid Display
export default function ImageGrid({
    user,
    images,
    // isLoading,
    showHearted = false,
    noDataMessage,
    showEdit = false,
}: ImageGridPropsInterface) {

    // if (isLoading) {
    //     return (
    //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    //             {/* Render multiple loading cards while loading */}
    //             {Array.from({ length: 6 }).map((_, index) => (
    //                 <LoadingCard key={index} />
    //             ))}
    //         </div>
    //     );
    // }
    // Fallback in case there are no images returned from fetchImages
    // if (!images || images.length === 0)
    //     return ( 
    //         <div>
    //             {/* {noDataMessage || 'No images available'} */}
    //             <NoDataLayout
    //                 message="Why not add a new private Image?"
    //                 buttonText="+ add image"
    //                 buttonLink={'/personal'}
    //             />
    //         </div>
    //     )

    // Images that have been favourited
    const displayedImages = images.filter((photo) => {
        const isFavouritedCondition = photo.isFavourited === true;
        const isShowAllCondition = showHearted && isFavouritedCondition;
        const isPrivateCondition = 
            photo.privacy === false ||
            (photo.privacy === true && photo.owner === user?.id)
        return isFavouritedCondition || isShowAllCondition || isPrivateCondition;
    });

    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
            {
                displayedImages.map((photo, index) => (
                    <Photo
                        key={index}
                        src={photo.image_url}
                        imageName={photo.imageName}
                        imageId={photo.imageId}
                        objectId={photo.objectId}
                        currentPrivacy={photo.privacy}
                        alt={photo.title}
                        title={photo.title}
                        description={photo.description}
                        isFavourited={photo.isFavourited}
                        ownerId={photo.owner}
                        currentUserId={user?.id}
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