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
        <div>
            <div>
                <Button onClick={onClose}>Close</Button>
                <div>
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        objectFit="contain"
                    />
                </div>
            </div>
        </div>
    )
}