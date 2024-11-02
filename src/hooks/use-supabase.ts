import { getSupabaseBrowserClient } from "@/utils/supabase/client";
import { useMemo } from "react";


export default function useSupabase() {
    return useMemo(getSupabaseBrowserClient, []);
}

