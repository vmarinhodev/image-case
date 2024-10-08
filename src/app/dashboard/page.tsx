
import { supabaseServer } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
        .select('*').order("created_at", { ascending: false });

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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts?.map((post) => {
                    return (
                        <div key={post.id} className="border rounded-md">
                            <div className="w-full h-96 relative " >
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Image
                                            key={post.id}
                                            src={post.postImage}
                                            alt={post.description || ""}
                                            fill
                                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                                            loading="lazy"
                                        />
                                    </DialogTrigger>
                                    <DialogContent className="max-w-7xl border-0 bg-transparent p-0">
                                        <div className="relative h-[calc(100vh-60px)] w-full overflow-clip rounded-md  bg-black bg-opacity-75 shadow-md">
                                            <Image src={post.postImage} fill alt={post.description || ''} className="h-full w-full object-contain" />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <h1>{post.description}</h1>
                        </div>
                    )
                })}
            </div>
        </main>
    )
};