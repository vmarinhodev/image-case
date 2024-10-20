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
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-4 rounded-lg relative border border-gray-600 max-w-[90vw] max-h-[90vh] overflow-hidden">
                <Button onClick={onClose} className="absolute top-2 right-2">Close</Button>
                <div className="relative w-full h-full">
                <div className="w-full h-full flex justify-center items-center"> 
                    <Image
                        src={src}
                        alt={alt}
                        width={600}
                        height={600}
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