'use client'

interface PhotoModalProps {
    src: string;
    alt: string;
    onClose?: VoidFunction;
}

import Image from "next/image";
import { Button } from "../ui/button";

export default function PhotoModal({ src, alt, onClose }: PhotoModalProps) {
    if (!src) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-20">
            <div className="bg-white p-4 rounded-lg relative ">
                <Button onClick={onClose} className="absolute bg-blue-600 hover:bg-blue-700 top-2 right-8 z-50">Close</Button>
                <div className="w-full h-full">
                <div className="relative w-[80vw] h-[80vh] flex justify-center items-center mt-10"> 
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        // sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 40vw"
                        style={{ objectFit: 'contain', objectPosition: 'center' }}
                        className="rounded-lg"
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}