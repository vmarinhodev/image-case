import { User } from '@supabase/supabase-js';
import { Dispatch, SetStateAction } from "react";

export interface ImageInterface {
    id: string;
    object_id: string;
    user_id: string;
    user_name: string;
    image_url: string;
    title: string;
    description: string;
    public: boolean;
}

export interface SignedImageUrlInterface {
    image_url: string;
    imageName: string;
    imageId: string;
    objectId: string;
    title: string;
    description: string;
    privacy: boolean;
    owner: string;
    ownerName: string;
    isFavourited?: boolean;
}

export interface ImageGridPropsInterface {
    user: User | null;
    isLoading?: boolean;
    images: SignedImageUrlInterface[];
    showHearted: boolean;
    showEdit: boolean;
    noDataMessage?: string;
}

export interface photoProps {
    src: string,
    imageName: string,
    imageId: string,
    objectId: string,
    privacy: boolean,
    alt: string,
    title: string,
    description: string;
    isFavourited?: boolean,
    ownerId: string,
    currentUserId: string | undefined,
    ownerName: string,
    showEdit: boolean,
    editingImageId: string,
};

export interface FormDataInterface {
    path?: string;
    imageName: string;
    imageId: string;
    title: string;
    description: string;
    isPublic: boolean;
    editingImageId?: string;
}

export interface FetchImagesInterface {
    fetchFavourites?: boolean,
    allPersonal?: boolean,
    allFavourited?: boolean,
    onlyPrivate?: boolean,
    onlyPublic?: boolean
} 

export interface FileUploaderInterface {
    editingImageId: string | null;
    formData?: { title: string; description: string; isPublic: boolean }; 
    setFormData?: React.Dispatch<React.SetStateAction<{ title: string; description: string; isPublic: boolean }>>;
    file: File | null;
    setFile?: React.Dispatch<React.SetStateAction<File | null>>;
    setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    clearEdit?: () => void;
}

export interface HandlePrivacyInterface {
    imageId: string;
    currentPrivacy: boolean;
    setPrivacyState: React.Dispatch<React.SetStateAction<boolean>>;
}