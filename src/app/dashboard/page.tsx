import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }
    return (
        <main className="container mx-auto py-6">
            <p>Dashboard</p>
        </main>
    )
};