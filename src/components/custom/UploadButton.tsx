'use client'

import { useRouter } from "next/navigation"
import router from "next/router"

export default function UploadButton() {
    const router = useRouter();
    const handleClick = () => {
        router.replace("/uploadspage")
    }
    return (
        <button 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            onClick={handleClick}
        >
            + Add new file
        </button>
    )
}