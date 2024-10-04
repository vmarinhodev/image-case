'use client'

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import Tus from '@uppy/tus';
import { Button } from "@/components/ui/button";
import useUser from "@/app/hooks/useUser";
import { createClient } from "@/utils/supabase/server";

export default function ImageUploaderForm() {
    const { data: user } = useUser();
    const supabase = createClient();

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

    const handleUpload = () => {
        uppy.setFileMeta(uppy.getFiles()[0].id, {
            objectName: user?.id + "/" + uppy.getFiles()[0].name
        })
    }

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
    )
}