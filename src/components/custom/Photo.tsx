'use client'

import Image from "next/image"
import { useState } from "react";
import PhotoModal from "./PhotoModal";
import deletePhoto from "@/app/actions/deletePhoto";
import handleFavourites from "@/app/actions/handleFavourites";
import {
    HeartFilledIcon,
    HeartIcon,
    LockClosedIcon,
    LockOpen2Icon,
    Pencil1Icon,
    TrashIcon
} from "@radix-ui/react-icons";
import { useFileUploader } from "./FileUploaderContext";
import { photoProps } from "@/app/types";
import { useHandlePrivacy } from "@/hooks/useHandlePrivacy";

const capitalizeFirstLetter = (string: string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function Photo({
    src,
    imageName,
    imageId,
    objectId,
    currentPrivacy,
    alt,
    title,
    description,
    isFavourited = false,
    ownerId,
    currentUserId,
    ownerName,
    showEdit,
    editingImageId,
}: Readonly<photoProps>) {
    const [showModal, setShowModal] = useState(false);
    const [privacyState, setPrivacyState] = useState(currentPrivacy);
    const isOwner = currentUserId === ownerId;
    const { openUploaderDialog } = useFileUploader();
     // Destructure the function and states returned by the hook
     const { handlePrivacy, loading, error } = useHandlePrivacy();

     const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevents default form submission

        // Call the function to handle the privacy change and check if it updates correctly
        await handlePrivacy({ imageId, currentPrivacy: privacyState, setPrivacyState });
    };

    function toggleModal() {
        setShowModal(!showModal)
    };

    return (
        <div
            className="flex flex-col bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] mt-4">
            <div className="relative min-h-[256px] max-h-[256px] h-[256px] overflow-hidden">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 40vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    className="cursor-pointer"
                    priority={true}
                    blurDataURL={src}
                    placeholder="blur"
                    onClick={() => setShowModal(true)}
                />
            </div>

            <div className="p-6 flex-grow">
                <h3 className="text-gray-800 text-xl font-bold">{capitalizeFirstLetter(title)}</h3>
                <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                    {capitalizeFirstLetter(description)}
                </p>
            </div>

            {/* Footer for buttons */}
            <div className="flex justify-between items-center p-4">
                {/* Conditionally show the Delete and Edit Buttons */}
                {showEdit && isOwner ? (
                    <>
                        {/*Delete */}
                        <form action={deletePhoto}>
                            <input type="hidden" name="photoPath" value={src} />
                            <input type="hidden" name="objectId" value={objectId} />
                            <button
                                type="submit"
                                className="bg-transparent border-none text-red-500 cursor-pointer hover:text-red-600 align-bottom"
                            >
                                <TrashIcon className="size-6" />
                            </button>
                        </form>
                        {/*Edit */}
                        <button
                            type="submit"
                            onClick={() => 
                                openUploaderDialog(
                                    {
                                        imageId,
                                        title,
                                        description,
                                        imageName,
                                        isPublic: privacyState,
                                        editingImageId,
                                    },
                                )
                            }
                            className="text-red-500 cursor-pointer hover:text-red-600 ml-1">
                            <Pencil1Icon className="size-6" />
                        </button>
                        {/* Privacy Button */}
                        <form className="ml-1">
                            <input type="hidden" name="isPrivate" value={privacyState ? 'true' : 'false'} />
                            <input type="hidden" name="imageId" value={imageId} />
                            <button
                                type="button"
                                onClick={handleClick}
                                className="text-red-500 cursor-pointer hover:text-red-600">
                                {privacyState ? <LockClosedIcon className="size-6" /> : <LockOpen2Icon className="size-6" />}
                            </button>
                        </form>
                    </>
                ) : (
                    <span className="text-sm font-bold text-gray-500 leading-relaxed">@ {ownerName}</span>
                )}

                {/* Favourite Button */}
                <form action={handleFavourites} className="ml-auto">
                    <input type="hidden" name="title" value={title} />
                    <input type="hidden" name="objId" value={objectId} />
                    <input type="hidden" name="isFavourited" value={isFavourited ? 'true' : 'false'} />
                    <button
                        type="submit"
                        className="text-red-500 cursor-pointer hover:text-red-600">
                        {isFavourited ? <HeartFilledIcon className="size-6" /> : <HeartIcon className="size-6" />}
                    </button>
                </form>
            </div>
            {/* Photo Modal */}
            {showModal && <PhotoModal src={src} alt={alt} onClose={toggleModal} />}
        </div>
    );
};