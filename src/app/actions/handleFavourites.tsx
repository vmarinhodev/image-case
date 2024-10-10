'use server'

import { supabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";


//Handle Favourite Images
export default async function handleFavourites(formData: FormData): Promise<void> {
    const supabase = supabaseServer();
    const photoName = formData.get('photoName') as string | null;
    const isFavourited = formData.get('isFavourited') as string | null;

    // Check for missing fields
    if (!photoName || !isFavourited) {
        return;
    }

    // Get the currently logged-in user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return;
    }
    
    // If isFavourited is 'true', remove from favourites, else add to favourites
    if (isFavourited === 'true') {
        const { error: deleteError } = await supabase
            .from('favourites')
            .delete()
            .match({ user_id: user.id, image_name: photoName });

        if (deleteError) {
            console.error('Error removing image from favourites')
            return;
        }

    } else {
        const { error: insertError } = await supabase
            .from('favourites')
            .insert([{ user_id: user.id, image_name: photoName }]);

        if (insertError) {
            console.error('Error adding image into favourites')
            return;
        }
    }

    // Revalidate the path to update the cache
    revalidatePath('/');
}
