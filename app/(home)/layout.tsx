'use client'
import {PropsWithChildren} from "react";
import NavBar from "@/components/shared/NavBar";
import "@/styles/globals.css";
import "@/styles/we-football.css";
import "@/styles/home-page.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false
        }
    }
});

export default function HomeLayout({children}: PropsWithChildren) {

    return (
        <html lang="en">
        <body className="body" style={{overflowX: "hidden"}}>
        <NavBar/>
        <div className="h-full bg-neutral-900 relative w-full pt-[60px]">
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
            {/*<ShootingStars/>*/}
            {/*<StarsBackground/>*/}
        </div>
        </body>
        </html>
    );

};