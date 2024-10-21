'use server'
import { supabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

function extractFilePath(url: string) {
    const parts = url.split('/users_folder/')
    if (parts.length < 2) {
        console.error('Invalid URL format')
        return '';
    };

    let filePath = parts[1];
    if (filePath.includes('?')) {
        filePath = filePath.split('?')[0];
    };
    console.log('filepath', filePath)
    return `${'users_folder'}/${filePath}`

}

export default async function deletePhoto(formData: FormData) {
    const supabase = supabaseServer();
    const src = formData.get('photoPath')
    console.log('src', src)

    if (typeof src !== 'string') {
        console.error('Photo data is missing or invalid');
        return;
    };

    const filePath = extractFilePath(src);

    if (!filePath) {
        console.error('Failed to extract filePath');
        return;
    }

    console.log('file deleted successfully from storage:', filePath);


    // Delete records from table
    const { error: dbError } = await supabase
        .from('images')
        .delete()
        .eq('image_url', src);

    if (dbError) {
        console.error('Error deleting record from database:', dbError.message);
        throw new Error(`Database deletion error: ${dbError.message}`);
    }

    const { data: existingFile, error: existingError } = await supabase
        .storage
        .from('allimages')
        .list('', { search: filePath });

    if (existingError || existingFile.length === 0) {
        console.error('File does not exist or cannot be found:', existingError?.message || filePath);
        return;
    }

    const { error: storageError } = await supabase
        .storage
        .from('allimages')
        .remove([filePath])

    if (storageError) {
        console.error('Error deleting file:', storageError.message);
        throw new Error(`Storage deletion error: ${storageError.message}`);
    }

    // Ensure no further attempts to access the deleted file
    if (!storageError && !dbError) {
        console.log('File and database records deleted successfully.');
        return;
    }

    console.log('Image data deleted successfully from database');

    revalidatePath('/')
}