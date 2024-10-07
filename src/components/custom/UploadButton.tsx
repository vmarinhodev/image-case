'use client'

export default function UploadButton() {
    return (
        <button onClick={() => {
            document.getElementById('upload-trigger')?.click()
    }}>Upload</button>
    )
}