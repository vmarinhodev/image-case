'use server'
import { supabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

function extractFilePath(url: string) {
    const parts = url.split('/users_folder/')
    if (parts.length < 2) {
        console.error('Invalid URL format')
        return ''
    };

    let filePath = parts[1];
    if (filePath.includes('?')) {
        filePath = filePath.split('?')[0];
    };
    return `${'users_folder'}/${filePath}`

}

export default async function deletePhoto(formData: FormData) {
    const supabase = supabaseServer();
    const src = formData.get('photoPath')
    
    if (typeof src !== 'string') {
        console.error('Photo data is missing or invalid');
        return;
    };
    
    const filePath = extractFilePath(src);

    if (!filePath) {
        console.error('Failed to extract filePath');
    }

    const { error } = await supabase
        .storage
        .from('allimages')
        .remove([filePath])

    if (error) {
        console.error('Error deleting file:', error.message);
        throw new Error(`Error: ${error.message}`)
    }

    console.log('file deleted successfully:', filePath)
    revalidatePath('/')
}