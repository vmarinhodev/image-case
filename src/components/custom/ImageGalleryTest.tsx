'use client'

import { getFavouriteById } from "@/app/queries/get-favourite-by-id";
import useSupabaseBrowser from "@/utils/supabase/browser";
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';



export default function ImageGallery({ params }: { params: { id: string } }) {
    const supabase = useSupabaseBrowser()
    const { data: favourite, isLoading, isError } = useQuery(getFavouriteById(supabase, params.id))
    console.log("data page various", params)
    if (isLoading) {
      return <div>Loading...</div>
    }

    if (isError || !favourite) {
      return <div>Error</div>
    }
    return (
      <>
      <h1>Image Name: { favourite.image_name }</h1>
      <h1>User Id: { favourite.object_id }</h1>
      </>
    )
}
