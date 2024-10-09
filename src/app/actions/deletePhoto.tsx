'use server'
import { supabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

function extractFilePath(url: string) {
    const parts = url.split('/user_uploads/')
    if (parts.length < 2) {
        console.error('Invalid url format')
        return ''
    };

    let filePath = parts[1];
    if (filePath.includes('?')) {
        filePath = filePath.split('?')[0];
    };
    return (`${'user_uploads'}/${filePath}`)

}

export default async function deletePhoto(formData: FormData) {
    const supabase = supabaseServer();
    const src = formData.get('photoPath') as string | null;
    
    if (!src) {
        throw new Error ('PhotoData is missing or invalid');
    }
    
    const filePath = extractFilePath(src);

    if (!filePath) {
        throw new Error ('Failed to extract filePath');
    }

    const response = await supabase
        .storage
        .from('photos')
        .remove([filePath])

    if (response.error) {
        throw new Error(`Error: ${response.error.message}`)
    }
    revalidatePath('/')
}