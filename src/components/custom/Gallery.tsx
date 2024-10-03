import BlurImage from "./BlurImage";
import { ImageCard } from "./ImageCard";

export default function Gallery() {
    return (
        <div className="max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8" >
                <ImageCard />
            </div>
        </div>
    )
}