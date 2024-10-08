'use client'
import useUser from "@/app/hooks/useUser";
import { Button } from "@/components/ui/button";
import { StarIcon } from "@radix-ui/react-icons";

interface AddToFavouritesProps {
    post_by: string,
    post_id: string,

}

export default function AddToFavourites({ post_by, post_id }: Readonly<AddToFavouritesProps>) {
    const { data: user, isFetching } = useUser();

    const handleFavourite = () => {
        console.log('favourite', post_id)
    }

    if (isFetching) {
        return <></>
    }

    if (user?.id === post_by) {
        return (
            <div>
                <Button onClick={handleFavourite}>
                    <StarIcon />
                </Button>
            </div>
        )
    }

    return <></>
}