'use client'

import { supabaseBrowser } from "@/utils/supabase/browser";
import React, { useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import { Dashboard } from '@uppy/react';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import useUser from "@/app/hooks/useUser";
import { toast } from "sonner";
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

export default function ImageUploaderForm() {
    const { data: user } = useUser();
    const supabase = supabaseBrowser();
    const inputTitleRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const inputDescriptionRef = useRef() as React.MutableRefObject<HTMLInputElement>;


    // Before Request
    const onBeforeRequest = async (req: any) => {
        const { data } = await supabase.auth.getSession();
        req.setHeader('Authorization', `Bearer ${data.session?.access_token}`);
    };


    const [uppy] = useState(() => new Uppy({
        restrictions: {
            maxNumberOfFiles: 1,
            allowedFileTypes: ['image/*'],
        }
    }).use(Tus, {
        endpoint: process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/upload/resumable',
        onBeforeRequest,
        allowedMetaFields: [
            'bucketName',
            'objectName',
            'contentType',
            'cacheControl',
        ]
    })
    );
    uppy.on('file-added', (file) => {
        uppy.setFileMeta(file.id, {
            bucketName: 'image-upload-miyamage',
            contentType: file.type,
        });
    });

    // Handle file upload to Supabase Storage
    const handleUpload = () => {
        if (uppy.getFiles().length !== 0) {
            const randomUUID = crypto.randomUUID();

            uppy.setFileMeta(uppy.getFiles()[0].id, {
                objectName: user?.id + "/" + randomUUID + "/" + uppy.getFiles()[0].name
            });

            // After upload Image upload text
            uppy.upload().then(async () => {
                const title = inputTitleRef.current.value;
                const description = inputDescriptionRef.current.value;
                if (description && title) {
                    const { error } = await supabase
                        .from("posts")
                        .update({description: description, title: title})
                        .eq("id", randomUUID)

                    if (error) {
                        // toast.error("Fail to updated description");
                        console.log('error from upload', error);
                    }
                    console.log("updated description", inputTitleRef.current.value)
                }
            });

        } else {

            console.log("Please select an image")
        };
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <button id="upload-trigger"></button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Image Uploader</DialogTitle>
                        <DialogDescription>
                            Select an image to upload
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-5">
                        <Dashboard
                            uppy={uppy}
                            className="w-full"
                            hideUploadButton
                        />
                        <Input
                            placeholder="Image title"
                            ref={inputTitleRef}
                        />
                        <Input
                            placeholder="Image description"
                            ref={inputDescriptionRef}
                        />
                        <Button
                            className="w-full bg-green-700"
                            onClick={handleUpload}
                        >
                            Upload
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
}