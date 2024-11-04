import { supabaseServer } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function getAuthenticatedUser(): Promise<User | null> {
    const supabase = supabaseServer();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user ) {
        console.log('error from getauthuser')
        return null;
    }

    return user;
}