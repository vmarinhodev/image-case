'use client'

import Image from "next/image"
import { useState } from "react";
import PhotoModal from "./PhotoModal";
import deletePhoto from "@/app/actions/deletePhoto";
import handleFavourites from "@/app/actions/handleFavourites";
import { HeartFilledIcon, HeartIcon, TrashIcon } from "@radix-ui/react-icons";


interface photoProps {
    src: string,
    alt: string,
    title: string,
    description: string;
    isFavourited?: boolean,
    ownerId: string,
    currentUserId: string,
    showEdit: boolean,
}

const capitalizeFirstLetter = (string: string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function Photo({
    src,
    alt,
    title,
    description,
    isFavourited = false,
    ownerId,
    currentUserId,
    showEdit,
}: Readonly<photoProps>) {
    const [showModal, setShowModal] = useState(false);
    const isOwner = currentUserId === ownerId;

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
                {/* Conditionally show the Delete Button */}
                { showEdit && isOwner ? (
                    <form action={deletePhoto}>
                        <input type="hidden" name="photoPath" value={src} />
                        <button
                            type="submit"
                            className="bg-transparent border-none text-red-500 cursor-pointer hover:text-red-600"
                        >
                            <TrashIcon className="size-6" />
                        </button>
                    </form>
                ) : (
                    <>
                        <p className="mt-4 text-sm text-gray-500 leading-relaxed">{ownerId}</p>
                    </>
                )}

                {/* Favourite Button */}
                <form action={handleFavourites} className="ml-auto">
                    <input type="hidden" name="title" value={title} />
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