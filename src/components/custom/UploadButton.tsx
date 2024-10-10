'use client'

import { useModal } from "../context/ModalContext";

export default function UploadButton() {
    const { setOpen } = useModal();
    return (
        <button 
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
            + Add new file
        </button>
    )
}