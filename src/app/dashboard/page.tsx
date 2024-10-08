import ImageGrid from "@/components/custom/ImageGrid";
import PhotoUploader from "@/components/custom/PhotoUploader";

export default function Dashboard() {
    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col items-center mb-6">
                    <PhotoUploader />
                </div>
                <ImageGrid />
            </div>
        </main>
    )
}