import { User } from '@supabase/supabase-js'

export interface ImageInterface {
    id: string;
    object_id: string;
    user_id: string;
    image_url: string;
    title: string;
    description: string;
    public: boolean;
}

export interface SignedImageUrlInterface {
    image_url: string;
    imageName: string;
    imageId: string;
    title: string;
    description: string;
    privacy: boolean;
    owner: string;
    isFavourited?: boolean;
}

export interface ImageGridPropsInterface {
    user: User;
    images: SignedImageUrlInterface[];
    favourites?: boolean;
    showHearted: boolean;
    showPrivate: boolean;
    showEdit: boolean;
    noDataMessage?: string;
}

export interface FormDataInterface {
    path?: string;
    imageName: string;
    imageId: string;
    title: string;
    description: string;
    isPublic: boolean;
    editingImageId?: string;
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