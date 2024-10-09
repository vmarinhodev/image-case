
import ImageGrid from "@/components/custom/ImageGrid";
import PhotoUploader from "@/components/custom/PhotoUploader";

export default function Dashboard() {
    const showFavourites = false;
    console.log('Showing favourites from dashboard page:', showFavourites);
    return (
        <>
        <main className="min-h-screen">
            <div className="container mx-auto px-4 py-4">
                <h1>DashBoard</h1>
                <div className="flex flex-col items-center mb-6">
                    <PhotoUploader />
                </div>
                <ImageGrid
                    favourites={showFavourites}
                />
            </div>
        </main>
        </>
    );
}