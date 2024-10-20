import { Logo } from "./Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { supabaseServer } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOut } from "@/app/login/actions";
import FileUploader from "./FileUploader";

export default async function Navbar() {
    const supabase = supabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    return <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between">
        <Logo />
        
        {user !== null ? (
            <>
            <FileUploader />
            <DropdownMenu>
                <DropdownMenuTrigger className='focus:outline-none'>
                    <Avatar>
                        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                        <AvatarFallback className='text-black'>MI</AvatarFallback>
                    </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/favourites">Favourites</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/private">Private</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <form action={signOut}>
                            <button>Logout</button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </>
        ) : (
            <Button className="bg-blue-600 hover:bg-blue-700">
                <Link href="/login">Login</Link>
            </Button>
        )}
    </div>
}