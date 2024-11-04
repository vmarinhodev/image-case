'use client'

import { QueryClient, QueryClientProvider, useIsFetching } from "@tanstack/react-query"
import React, { useState } from "react"
import LoadingIndicator from "./LoadingIndicator";

export const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(
        () => 
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    },
                },
            }
        )
    );


    return (
        <QueryClientProvider client={queryClient}>
            <LoadingIndicatorWrapper />
            {children}
        </QueryClientProvider>
    )
};

const LoadingIndicatorWrapper = () => {
    const isFetching = useIsFetching();
    return isFetching ? <LoadingIndicator /> : null;
}