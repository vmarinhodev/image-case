'use client';

import { supabaseBrowser } from "@/utils/supabase/browser";
import { useQuery } from "@tanstack/react-query";

const initUser = {
    created_at: "",
    display_name: "",
    email: "",
    id: "",
    image_url: "",
}
export default function useUser() {

    return useQuery ({
        queryKey: ['user'],
        queryFn: async () => {
            const supabase = supabaseBrowser();
            const { data } = await supabase.auth.getSession();
            console.log('data', data.session?.user)
            if (data.session?.user) {
                //fetch user data
                const{ data: user } = await supabase
                    .from('imagecase')
                    .select('*')
                    .eq('id', data.session.user.id)
                    .single();

                    return user;
            }
            return initUser;
        }
    });
}