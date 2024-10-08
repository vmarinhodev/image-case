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
            <div className="bg-gray-800 p-4 rounded-lg relative border border-gray-600">
                <Button onClick={onClose}>Close</Button>
                <div className="relative w-[80vw] h-[80vh]">
                    <Image
                        src={src}
                        alt={alt}
                        fill={true}
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        className="rounded-lg"
                    />
                </div>
            </div>
        </div>
    )
}