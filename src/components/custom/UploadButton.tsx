'use client'

export default function UploadButton() {
    return (
        <button 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            onClick={() => {
                document.getElementById('upload-trigger')?.click()
            }}
        >
            + Add new file
        </button>
    )
}