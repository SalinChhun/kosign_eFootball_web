import {PropsWithChildren} from "react";
import NavBar from "@/components/shared/NavBar";
import "@/styles/globals.css";
import "@/styles/we-football.css";
import "@/styles/home-page.css";
import {ShootingStars} from "@/components/shared/ShootingStars";
import {StarsBackground} from "@/components/shared/StarsBackground";

export default function HomeLayout({children}: PropsWithChildren) {

    return (
        <html lang="en">
        <body className="body" style={{overflowX: "hidden"}}>
        <NavBar/>
        {/*<div className="h-full bg-neutral-900 relative w-full">*/}
        <div className="h-full bg-neutral-900 relative w-full">
            {children}
            <ShootingStars/>
            <StarsBackground/>
        </div>
        </body>
        </html>
    );

};