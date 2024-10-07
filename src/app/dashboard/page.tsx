
import { supabaseServer } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
import Image from "next/image"

export default async function Dashboard() {
    const supabase = supabaseServer();
    const { data: { user }, } = await supabase.auth.getUser();
    const imageUrlHost = "https://hbbplmgyfcvqkbwszgiu.supabase.co/storage/v1/object/public/image-upload-miyamage/";

    if (!user) {
        return redirect('/login');
    }

    // fetch user posts by match
    const { data: userMatch } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)

    const { data } = await supabase
        .from('posts')
        .select('*');

    const posts = data?.map((post) => {
        // console.log('post', post)
        return {
            postImage: `${imageUrlHost}/${post.user_id}/${post.id}/${post.image}`,
            ...post,
        }
    })

    return (
        <main className="container mx-auto py-6">
            <p>Dashboard</p>
            <div className="grid grid-cols-3 gap-6">
                {posts?.map((post) => {
                    return (
                        <div key={post.id} className="rounded-md w-full space-y-5 relative">
                            <div className="w-full h-96 relative rounded-md border">
                                <Image
                                    src={post.postImage}
                                    alt={post.description || ""}
                                    fill
                                    objectFit="cover"
                                />
                            </div>
                            <h1>{post.description}</h1>
                        </div>
                    )
                })}
            </div>
        </main>
    )
};