'use client'

import { getFavouriteById } from "@/app/queries/get-favourite-by-id";
import useSupabaseBrowser from "@/utils/supabase/browser";
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import LoadingCard from "./LoadingCard";



export default function ImageGallery({ params: { userId, imageName }}: { params: { userId: string, imageName: string } }) {
    const supabase = useSupabaseBrowser();
    const { data: favourite, isLoading, isError } = useQuery(getFavouriteById(supabase, userId))
    console.log("data page various", favourite, imageName)
    if (isLoading) {
        return (
            <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold mb-4">Loading your favorites...</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <LoadingCard key={index} />
                ))}
            </div>
        </div>
        );
    }

    // if (!images || images.length === 0) {
    //     return <p>{noDataMessage}</p>;
    // }

    if (isError || !favourite) {
      return <div>Error</div>
    }
    return (
        <>
      {favourite.map((fav, index) => (
       <div key={index}>
        <h1>Image Name: { imageName }</h1>
        <h1>User Id: { fav.object_id }</h1>
        </div>
      ))}
      </>
    )
}
