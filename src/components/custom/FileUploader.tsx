'use client'

import { supabaseBrowser } from "@/utils/supabase/browser";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useFileUploader } from "./FileUploaderContext";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";

export default function FileUploader() {
    const supabase = supabaseBrowser();
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();
    const { isUploaderOpen, setIsUploaderOpen, closeUploaderDialog, setFormData, editingImageId, formData, clearFormData } = useFileUploader();

    // Reference to the hidden button
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (editingImageId) {
            console.log("Editing image with ID:", editingImageId);
            // Load data if editing
        }
    }, [editingImageId]);
    // Automatically click the hidden trigger button to open the dialog
    useEffect(() => {
        console.log("useEffect triggered with isUploaderOpen:", isUploaderOpen, editingImageId);
        if (isUploaderOpen && triggerRef.current) {
            triggerRef.current.click();
        }
    }, [isUploaderOpen, editingImageId]);

    // Handle form input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    }

    // handle file input change
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target.files ? e.target.files[0] : null;
        setFile(fileInput);
    };

    // const handleFileUpsert = async () => {
    //     // image metadata update at table
    //     const { error: upsertError } = await supabase
    //         .from('images')
    //         .upsert({
    //             title: formData.title,
    //             description: formData.description,
    //             public: formData.isPublic,
    //         })
    //         .eq('id', formData.imageId);

    //     if (upsertError) throw upsertError;
    // }

    const handleFileUpload = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!file && !editingImageId) {
            toast.error('Please select a file');
            return;
        }

        try {
            setUploading(true);

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                throw new Error('User not authenticated');
            }

            const filePath = editingImageId ? formData.path : ''; 
            const displayName = user?.user_metadata.display_name;
            const randomUUID = crypto.randomUUID();

            if (file) {
                
                const fileExt = file?.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `users_folder/${randomUUID}/${fileName}`;
                console.log('fileName', fileExt)

            //file to supabase storage
            const { error: uploadError } = await supabase
                .storage
                .from('allimages')
                .upload(filePath, file as File);

            if (uploadError) throw uploadError;

             // If editing, you may want to delete the previous image file here
            }

            

            // image metadata to table
            const { error: insertError } = await supabase
                .from('images')
                .upsert({
                    id: editingImageId ||randomUUID,
                    title: formData.title,
                    description: formData.description,
                    public: formData.isPublic,
                    user_name: displayName,
                    path: filePath || undefined,
                    image_url: formData.imageName,
                    user_id: user.id
                })

            if (insertError) throw insertError;

            await fetch('/api/revalidate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            // Show success toast
            toast.success(editingImageId ? 'Image updated successfully.' : 'File uploaded successfully.');
            router.refresh();

            //Close dialog and reset form data
            closeUploaderDialog();
            clearFormData();
        } catch (error) {
            console.error('Error during upload', error);
        } finally {
            setUploading(false);
        }
    };

    // Handle closing and clearing form data
    const handleDialogClose = (isOpen: boolean) => {
        setIsUploaderOpen(isOpen);
        if (!isOpen) clearFormData(); // Clear form data when dialog closes
    };

    return (
        <div>
            <Dialog open={isUploaderOpen} onOpenChange={handleDialogClose}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload a new Image</DialogTitle>
                        <DialogDescription>
                            Select a file and add your title and description
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleFileUpload} className="space-y-4">
                        {/* Title Input */}
                        <div>
                            <Label htmlFor="title" className="block text-sm font-medium">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Title"
                                value={formData?.title}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                        </div>

                        {/* Description Input */}
                        <div>
                            <Label htmlFor="description" className="block text-sm font-medium">Description</Label>
                            <Input
                                name="description"
                                id="description"
                                placeholder="Description"
                                value={formData?.description}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                        </div>

                        {/* Public Checkbox */}
                        <div className="flex items-center">
                            <Input
                                type="checkbox"
                                name="isPublic"
                                id="isPublic"
                                checked={formData?.isPublic}
                                onChange={handleChange}
                                className="h-4 w-4 text-green-600"
                            />
                            <label htmlFor="isPublic" className="ml-2 block text-sm font-medium">Make private</label>
                        </div>

                        {!editingImageId && 
                        <>
                        {/* File Upload Input */}
                        <div>
                            <Label htmlFor="file-upload" className="block text-sm font-medium">Image</Label>
                            <Input
                                type="file"
                                name="file"
                                id="file-upload"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-1 block w-full text-sm"
                            />
                        </div>
                        </>
                        }


                        

                        <DialogFooter>
                            <button
                                type="submit"
                                disabled={uploading}
                                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
                            >
                                {uploading ? 'Uploading...' : !editingImageId ? 'Upload photo' : 'Update Details'}
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};