import useSupabaseBrowser from "@/utils/supabase/browser";
import { HandlePrivacyInterface } from "../types";

export default async function handlePrivacy({imageId, currentPrivacy, setPrivacyState }: HandlePrivacyInterface) {
    const supabase = useSupabaseBrowser()

    console.log('handleprivacy', imageId, currentPrivacy)
    try {
        const newPrivacy = !currentPrivacy;
    
    const { error: updateError } = await supabase
        .from('images')
        .update({public: newPrivacy})
        .eq('id', imageId)

        if (updateError) {
            console.error('updateError', updateError)
            return;
        }

        setPrivacyState(newPrivacy);
        console.log('privacy successfully updated to', newPrivacy)
    } catch (updateError) {
        console.error('Unexpected error while updating privacy:', updateError)
    }
}