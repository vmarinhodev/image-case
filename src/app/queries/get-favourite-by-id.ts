import { TypedSupabaseClient } from '@/utils/types'

export function getFavouriteById(client: TypedSupabaseClient, userId: string) {
  console.log('getFavouriteById', userId)
  return client
    .from('favourites')
    .select(`object_id`)
    .eq('user_id', userId)
    .throwOnError()
}
