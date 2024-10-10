'use client'

import { useState } from "react"
import FileUploader from "./FileUploader";

export default function ModalController() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <FileUploader open={open} setOpen={setOpen} />
        </>
    );
};