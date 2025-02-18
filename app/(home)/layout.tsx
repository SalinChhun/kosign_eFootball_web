import {PropsWithChildren} from "react";
import NavBar from "@/app/components/shared/NavBar";
import "@/app/styles/globals.css";
import "@/app/styles/we-football.css";
import "@/app/styles/home-page.css";
import {ShootingStars} from "@/app/components/shared/ShootingStars";
import {StarsBackground} from "@/app/components/shared/StarsBackground";

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