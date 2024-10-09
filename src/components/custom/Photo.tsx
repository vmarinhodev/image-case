'use client'

import Image from "next/image"
import { useState } from "react";
import PhotoModal from "./PhotoModal";

interface photoProps {
    src: string,
    alt: string,
    width: number,
    height: number,
    photoName: string,
    // isFavourited: boolean
}

export default function Photo({ src, alt, width, height }: Readonly<photoProps>) {
    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(!showModal)
    }
    return (
        <>
            <div
                style={{ width, height }}
                className="relative w-auto h-auto shadow-md border border-white border-opacity-80 rounded-lg overflow-hidden cursor-pointer"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    loading="lazy"
                    onClick={() => setShowModal(true)}
                />
                {showModal && <PhotoModal src={src} alt={alt} onClose={toggleModal} />}
            </div>
        </>
    );
};