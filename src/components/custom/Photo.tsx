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
    width: number,
    height: number,
    photoName: string,
    isFavourited: boolean
}

export default function Photo({
    src,
    alt,
    width,
    height,
    photoName,
    isFavourited = false
}: Readonly<photoProps>) {
    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(!showModal)
    };

    return (
        <>
            <div
                style={{ width, height }}
                className="relative w-auto h-auto shadow-md border border-white border-opacity-80 rounded-lg overflow-hidden cursor-pointer"
            >
                {/* Delete Button */}
                <form
                    action={deletePhoto}
                    className="absolute bottom-2.5 right-10 z-10"
                >
                    <input type="hidden" name="photoPath" value={src} />
                    <button
                        className="bg-transparent border-none text-white cursor-pointer hover:text-red-500 hover:scale-110 transition duration-300"
                    >
                        <TrashIcon />
                    </button>
                </form>

                {/* Favourites Button */}
                <form
                    action={handleFavourites}
                    className="absolute bottom-2.5 right-2.5 z-10"
                >
                    <input type="hidden" name="photoName" value={photoName} />
                    <input type="hidden" name="isFavourited" value={isFavourited ? 'true' : 'false'} />
                    <button
                        type="submit"
                        className="bg-transparent border-none text-white cursor-pointer hover:text-red-500 hover:scale-110 transition duration-300"
                    >
                        {isFavourited ? <HeartFilledIcon /> : <HeartIcon />}
                    </button>
                </form>

                <Image
                    src={src}
                    alt={alt}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    priority
                    fill
                    onClick={() => setShowModal(true)}
                />
                {showModal && <PhotoModal src={src} alt={alt} onClose={toggleModal} />}
            </div>
        </>
    );
};