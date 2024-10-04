'use client';

const initUser = {
    created_at: "",
    display_name: "",
    email: "",
    id: "",
    image_url: "",
}

import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {

    return useQuery ({
        queryKey: ['user'],
        queryFn: async () => {
            const supabase = createClient();
            const { data } = await supabase.auth.getUser();
            if (data.user) {
                //fetch user data
                const{ data: user } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', data.user.id)
                    .single();

                    return user;
            }
            return initUser;
        }
    });
}