

import { uploadSchema, UploadValidationSchemaType } from "@/schemas/formsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import FileUploader from "../custom/FileUploader";

export default function UploadForm() {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<UploadValidationSchemaType>({
        resolver: zodResolver(uploadSchema)
    });

    const onSubmit: SubmitHandler<UploadValidationSchemaType>= async (data) => {
        setIsUploading(true)
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('isPublic', data.isPublic ? 'true' : 'false');
        formData.append('file', data.image[0]);

        try {
            const result = await FileUploader(formData);

            if (result.success) {
                toast.success("File uploaded sucessfully");
                reset();
                router.refresh();
            } else {
                throw result.error;
            }
        } catch (error) {
            console.error("Error during upload", error);
            toast.error('Failed to upload file');
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title Field */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium">Title</label>
                <input
                    type="text"
                    id="title"
                    {...register("title")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                {errors.title && <span className="text-red-600 text-sm">{errors.title.message}</span>}
            </div>

            {/* Description Field */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <textarea
                    id="description"
                    {...register("description")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                {errors.description && <span className="text-red-600 text-sm">{errors.description.message}</span>}
            </div>

            {/* File Input */}
            <div>
                <label htmlFor="image" className="block text-sm font-medium">Image</label>
                <input
                    type="file"
                    id="image"
                    {...register("image")}
                    className="mt-1 block w-full text-sm"
                    accept="image/*"
                />
                {errors.image && <span className="text-red-600 text-sm">{errors.image?.message?.toString()}</span>}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isUploading}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
            >
                {isUploading ? "Uploading..." : "Upload Photo"}
            </button>
        </form>
    );
}