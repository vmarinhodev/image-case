import ImageGrid from "@/components/custom/ImageGrid";
import PhotoUploader from "@/components/custom/PhotoUploader";

export default function Photos() {
    const showFavourites = false;
    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 py-4">
                <h1>This is the Photos page</h1>
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-4xl font-bold mb-4">Photos</h1>
                    <PhotoUploader />
                </div>
                <ImageGrid
                    favourites={showFavourites}
                />
            </div>
        </main>
    )
}