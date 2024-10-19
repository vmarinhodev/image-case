import ImageGrid from "@/components/custom/ImageGrid";

// async function fetchUserFavouriteImages(user: User) {

// }

export default function Favourites() {
    return (
        <main className="min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Favourites</h1>
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col items-center mb-6">
                    <ImageGrid
                        favourites={true}
                        showHearted={true}
                        showPrivate={false}
                    />
                </div>
            </div>
        </main>
    )
}