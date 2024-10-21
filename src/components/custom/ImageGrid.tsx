import { ImageGridPropsInterface } from "@/app/types";
import Photo from "./Photo";


// Image Grid Display
export default async function ImageGrid({
    user,
    images,
    favourites = false,
    showHearted = false,
    showPrivate = false,
    noDataMessage,
}: ImageGridPropsInterface) {

    if (!images.length) return <div>{noDataMessage || 'No images available'}</div>

    // Images that have been favourited
    const displayedImages = images.filter((photo) => {
        const isFavouritedCondition = favourites ? photo.isFavourited : true;
        const isShowAllCondition = showHearted;

        const isPrivateCondition = 
            photo.privacy === false ||
            (photo.privacy === true && showPrivate && photo.owner === user.id)

        return isFavouritedCondition && isShowAllCondition && isPrivateCondition;
    })

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                displayedImages.map((photo, index) => (
                    <Photo
                        key={index}
                        src={photo.image_url}
                        alt={photo.title}
                        title={photo.title}
                        description={photo.description}
                        isFavourited={photo.isFavourited}
                        ownerId={photo.owner}
                        currentUserId={user.id}
                    />
                ))
            }
        </div>
    )
}