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
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOut } from "@/app/login/actions";
import UploadButton from "./UploadButton";


export default async function Navbar() {
    const supabase = await createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    return <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between">
        <Logo />
        {user !== null ? (
            <DropdownMenu>
                <UploadButton />
                <DropdownMenuTrigger className='focus:outline-none'>
                    <Avatar>
                        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                        <AvatarFallback className='text-black'>MI</AvatarFallback>
                    </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/favourites">Favourites</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <UploadButton />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <form action={signOut}>
                            <button>Logout</button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ) : (
            <Button>
                <Link href="/login">Login</Link>
            </Button>
        )}
    </div>
}