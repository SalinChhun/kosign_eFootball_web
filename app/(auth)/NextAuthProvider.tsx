"use client";
import {SessionProvider} from "next-auth/react";
import {PropsWithChildren, useEffect} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import toast, {Toaster, useToasterStore} from "react-hot-toast";
// import { Tooltip } from 'react-tooltip';
import {usePathname, useSearchParams} from "next/navigation";
import {Router} from "next/router";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false
        }
    }
});
export default function NextAuthProvider({children}: PropsWithChildren) {
    const pathName = usePathname();
    const params = useSearchParams();
    const { toasts } = useToasterStore();
    useEffect(() => {
        toasts
            .filter((t) => t.visible) // Only consider visible toasts
            .filter((_, i) => i >= 1) // Is toast index over limit
            .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
    }, [toasts]);

    useEffect(()=>{
        // @ts-ignore
        import("bootstrap/dist/js/bootstrap.bundle.min.js");
    },[])

    useEffect(() => {

        const handleBeforeUnload = (event: any) => {
            // Code to remove params goes here
            const currentUrl = new URL(window.location.href);
            const searchParams = new URLSearchParams(currentUrl.search);
            searchParams.delete('start_date');
            searchParams.delete('end_date');

            // Update the search query in the URL
            currentUrl.search = searchParams.toString();
            // @ts-ignore
            history.replaceState(null, null, currentUrl.toString());
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };

    }, [])

    return (
        <SessionProvider>
            <Toaster
                position="top-center"
                reverseOrder={false}
                containerStyle={{
                    zIndex: 99999
                }}
                toastOptions={{
                    style: {
                        pointerEvents: "none",
                        fontSize: "14px",
                        padding: "12px",
                    }
                }}
            />
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>

            {/*<Tooltip className="ks-wt-tooltip" id="ks-wt-tooltip-id" />*/}
            {/*<Tooltip place="right" className="ks-wt-tooltip-right" id="ks-wt-tooltip-right-id" />*/}
            {/*<Tooltip place="bottom" className="ks-wt-tooltip-bottom" id="ks-wt-tooltip-bottom-id" />*/}
            {/*<Tooltip place="left" className="ks-wt-tooltip-left" id="ks-wt-tooltip-left-id" />*/}
        </SessionProvider>
    );
}
