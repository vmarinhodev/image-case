import { supabaseServer } from "@/utils/supabase/server"
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const supabase = supabaseServer();
    const { data: { user }, } = await supabase.auth.getUser();
    const imageUrlHost = "https://hbbplmgyfcvqkbwszgiu.supabase.co/storage/v1/object/public/image-upload-miyamage/";

    if (!user) {
        return redirect('/login');
    }

    // fetch user posts by match
    const {data: userMatch }= await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)

    const { data } = await supabase
        .from('posts')
        .select('*');

    const posts = data?.map((post) => {
        return {
            image: `${imageUrlHost}${post.user_id}/${post.id}/${post.name}`,
            ...post,
        }
    })


    return (
        <main className="container mx-auto py-6">
            <p>Dashboard</p>
            {posts?.map((post) => {
                return (
                    <div key={post.id}>
                        <div className="w-96">
                            <h1>@{post.description}</h1>
                        </div>
                    </div>
                )
            })}
            {JSON.stringify({data: userMatch})}
        </main>
    )
};