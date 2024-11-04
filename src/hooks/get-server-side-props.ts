import { GetServerSideProps } from "next";

type Props = {
    user: {
        email: string;
        id: string;
    } | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
    const userEmail = req.headers['x-user-email'] as string | undefined;
    const userId = req.headers['x-user-id'] as string | undefined;

    const user = userEmail && userId ? { email: userEmail, id: userId } : null;

    return { 
        props: {
            user,
        },
    };
};