'use client'

import { supabaseBrowser } from "@/utils/supabase/browser";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function PhotoUploader() {
    const supabase = supabaseBrowser();
    const [uploading, setUploading] = useState(false);
    const router = useRouter();


    // Handle Image Upload
    async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        try {
            setUploading(true);
            const target = event.target as HTMLInputElement;
            const file: File = (target.files as FileList)[0]
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                throw new Error("User not Authenticated");
            }
            const filePath = `user_uploads/${user.id}/${fileName}`
            const { error } = await supabase.storage
                .from('photos')
                .upload(filePath, file)

            if (error) {
                throw error
            }

            await fetch('/api/revalidate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({path: '/dashboard'})
            })
            router.refresh();
 
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false)
        }
    };

    return (
        <label
            htmlFor="photo-upload"
            className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg m-4"
        >
            {uploading ? 'Uploading...' : 'Upload Image'}
            <input
                type="file"
                id="photo-upload"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
            />
        </label>
    )
}