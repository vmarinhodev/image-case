import ImageGrid from "@/components/custom/ImageGrid";

export default function Photos() {
  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Photos</h1>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center mb-6">
          <ImageGrid
            favourites={true}
            showHearted={true}
          />
        </div>
      </div>
    </main>
  )
}