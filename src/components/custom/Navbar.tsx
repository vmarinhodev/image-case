'use client'

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
import Link from "next/link";
import { Button } from "../ui/button";
import { signOut } from "@/app/auth/authActions";
import { useFileUploader } from "./FileUploaderContext";
import FileUploader from "@/components/custom/FileUploader";

type NavbarProps = {
    user: {
        email: string;
        id: string;
    } | null;
};

export default function Navbar({ user }: NavbarProps) {
    const { openUploaderDialog } = useFileUploader();

    return <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between">
        <Logo />

        {user ? (
            <>

            <FileUploader />
                <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                    onClick={() => {
                        openUploaderDialog()
                    }}
                    
                >
                    + Add a new file
                </Button>
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
                        <DropdownMenuItem asChild>
                            <Link href="/personal">Personal</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/various">Various</Link>
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
                <Link href="/">Login</Link>
            </Button>
        )}
    </div>
}