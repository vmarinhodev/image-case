import { HandlePrivacyInterface } from "@/app/types";
import useSupabaseBrowser from "@/utils/supabase/browser";
import { useState } from "react";
import { toast } from "sonner";

export function useHandlePrivacy() {
    const supabase = useSupabaseBrowser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePrivacy = async ({imageId, currentPrivacy, setPrivacyState }: HandlePrivacyInterface) => {
        setLoading(true);
        setError(null);
        try {
            const newPrivacy = !currentPrivacy;
            const { error: updateError } = await supabase
                .from('images')
                .update({ public: newPrivacy }) // Ensure this matches the column name in your database
                .eq('id', imageId);

            if (updateError) {
                console.error('updateError:', updateError);
                setError(updateError.message);
                return;
            }
            setPrivacyState(newPrivacy);
            toast.success(`Privacy successfully updated to ${newPrivacy ? "Private" : "Public" } Image`)
        } catch (error) {
            console.error('Unexpected error while updating privacy:', error);
            toast.error('Unexpected error occurred while updating privacy')
            setError('Unexpected error occurred while updating privacy.');
        } finally {
            setLoading(false);
        }
    };

    return { handlePrivacy, loading, error };
}