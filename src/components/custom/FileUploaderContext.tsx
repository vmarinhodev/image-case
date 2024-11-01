'use client'
import { FormDataInterface } from "@/app/types";
import React, { createContext, useContext, useState } from "react";

// Define the type for the context value
interface FileUploaderContextValue {
    isUploaderOpen: boolean;
    setIsUploaderOpen: (isOpen: boolean) => void;
    openUploaderDialog: (formData?: FormDataInterface) => void;
    closeUploaderDialog: () => void;
    setFormData: React.Dispatch<React.SetStateAction<FormDataInterface>>; // Type for setFormData
    formData: FormDataInterface;
    clearFormData: () => void;
    editingImageId: string | null;
    setEditingImageId: (id: string | null) => void;
    clearEditingImageId: () => void;
}



// Initialize the context with `undefined` so that it's only defined when used in the provider
const FileUploaderContext = createContext<FileUploaderContextValue | undefined>(undefined);

export function FileUploaderProvider({ children }: { children: React.ReactNode }) {
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);
    const [editingImageId, setEditingImageId] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormDataInterface>({
        title: '',
        description: '',
        isPublic: false,
        imageId: '',
        imageName: '',
    });

     // Function to clear the form data
     const clearFormData = () => {
        setFormData({ imageId : "", title: "", description: "", imageName: "", isPublic: false });
    };
    
    const openUploaderDialog = (formData?: FormDataInterface & { editingImageId?: string }) => {
        console.log('editingImageId Context', formData?.editingImageId)
        setIsUploaderOpen(true);
        if (formData) {
            setFormData(formData)
            if (formData?.editingImageId) {
                setEditingImageId(formData?.editingImageId)
            };
        };
    };

    const closeUploaderDialog = () => {
        setIsUploaderOpen(false)
        clearEditingImageId();
        clearFormData();
    };

    const clearEditingImageId = () => setEditingImageId(null);

    return (
        <FileUploaderContext.Provider value={{
            isUploaderOpen,
            setIsUploaderOpen,
            openUploaderDialog,
            closeUploaderDialog,
            setFormData,
            formData,
            clearFormData,
            editingImageId,
            setEditingImageId,
            clearEditingImageId,
        }}>
            {children}
        </FileUploaderContext.Provider>
    );
}

// Custom hook to use the FileUploader context
export function useFileUploader() {
    const context = useContext(FileUploaderContext);
    if (context === undefined) {
        throw new Error("useFileUploader must be used within a FileUploaderProvider");
    }
    return context;
}
