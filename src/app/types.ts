import { User } from '@supabase/supabase-js'


export interface ImageInterface {
    id: string;
    user_id: string;
    image_url: string;
    title: string;
    description: string;
    public: boolean;
}
export interface SignedImageUrlInterface {
    image_url: string;
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