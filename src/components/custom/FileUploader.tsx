'use client'

import { supabaseBrowser } from "@/utils/supabase/browser";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { DialogDescription, DialogFooter, DialogHeader } from "../ui/dialog";

interface FormData {
    title: string;
    description: string;
    isPublic: boolean;
};

export default function FileUploader() {
    const supabase = supabaseBrowser();
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        isPublic: false,
    });
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();

    // Handle form input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: (e.target as HTMLInputElement).checked, // Type assertion for 'checked'
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    }

    // handle file input change
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target.files ? e.target.files[0] : null;
        setFile(fileInput);
    };

    const handleFileUpload = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file) {
            console.error('Please select a file');
            return;
        }

        try {
            setUploading(true);

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                throw new Error('User not authenticated');
            }

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `user_uploads/${user.id}/${fileName}`;

            //file to supabase storage
            const { error: uploadError } = await supabase.storage
                .from('photos')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // image metadata to table
            const { error: insertError } = await supabase
                .from('images')
                .insert({
                    user_id: user.id,
                    title: formData.title,
                    description: formData.description,
                    public: formData.isPublic,
                    image_url: filePath,
                });

            if (insertError) {
                throw insertError;
            }

            await fetch('/api/revalidate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            router.refresh();
        } catch (error) {
            console.error('Error during upload', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    {/* <button id="upload-trigger"></button> */}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload a new file</DialogTitle>
                        <DialogDescription>
                            Select ane file and add your title and description
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <form onSubmit={handleFileUpload} className="space-y-4">
                            {/* Title Input */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            </div>

                            {/* Description Input */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            </div>

                            {/* Public Checkbox */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isPublic"
                                    id="isPublic"
                                    checked={formData.isPublic}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-green-600"
                                />
                                <label htmlFor="isPublic" className="ml-2 block text-sm font-medium">Make Public</label>
                            </div>

                            {/* File Upload Input */}
                            <div>
                                <label htmlFor="file-upload" className="block text-sm font-medium">Image</label>
                                <input
                                    type="file"
                                    name="file"
                                    id="file-upload"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full text-sm"
                                    required
                                />
                            </div>
                        </form>
                    </div>
                    <DialogFooter>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
                        >
                            {uploading ? 'Uploading...' : 'Upload Image'}
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>



        </div>



    );
};