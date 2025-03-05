'use client'
import {PropsWithChildren, useEffect} from "react";
import NavBar from "@/components/shared/NavBar";
import "@/styles/globals.css";
import "@/styles/we-football.css";
import "@/styles/home-page.css";
import {toast, Toaster, useToasterStore} from "react-hot-toast";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SessionProvider} from "next-auth/react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false
        }
    }
});

export default function HomeLayout({children}: PropsWithChildren) {
    const { toasts } = useToasterStore();
    useEffect(() => {
        toasts
            .filter((t) => t.visible) // Only consider visible toasts
            .filter((_, i) => i >= 1) // Is toast index over limit
            .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
    }, [toasts]);
    return (
        <html lang="en">
        <body className="body" style={{overflowX: "hidden"}}>
        <Toaster
            position="top-right"
            reverseOrder={false}
            containerStyle={{
                zIndex: 99999
            }}
            toastOptions={{
                style:{
                    pointerEvents: 'none'
                }
            }}/>
        <NavBar/>
        <div className="h-full bg-neutral-900 relative w-full pt-[60px]">
            <SessionProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </SessionProvider>
            {/*<ShootingStars/>*/}
            {/*<StarsBackground/>*/}
        </div>
        </body>
        </html>
    );

};