'use client'

import { ChangeEvent, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { convertBlobUrlToFile } from "@/utils/convertFiles";
import { uploadImage } from "@/utils/supabase/storage/client";

export default function ImageUploader() {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files!);
            const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));

            setImageUrls([...imageUrls, ...newImageUrls]);
        }
    };

    const [isPending, startTransition] = useTransition();

    const handleClickUploadImagesButton = () => {
        startTransition( async () => {
            let urls = [];
            for (const url of imageUrls) {
                const imageFile = await convertBlobUrlToFile(url);

                const {imageUrl, error} = await uploadImage({
                    file: imageFile,
                    bucket: 'image-upload-miyamage'
                });
                if (error) {
                    console.log(error)
                    return;
                }

                urls.push(imageUrl);
            }

            console.log('urls', urls)
            setImageUrls([]);
        })
    };

    return (
        <div className="min-h-screen flex justify-center items-center flex-col gap-8">
            <input
                type="file"
                hidden
                multiple
                ref={imageInputRef}
                onChange={handleImageChange}
            />

            <Button
                onClick={() => imageInputRef.current?.click()}
            >
                Select Images
            </Button>

            <div className="flex gap-4">
                {imageUrls.map((url, index) => (
                    <Image
                        key={url}
                        src={url}
                        width={300}
                        height={300}
                        alt={`img-${index}`}
                    />
                ))}
            </div>

            <Button
                onClick={handleClickUploadImagesButton}
            >
                Upload Images
            </Button>
        </div>
    )

}