import {PropsWithChildren} from "react";
import NavBar from "@/app/components/shared/NavBar";
import "@/app/styles/globals.css";
import "@/app/styles/we-football.css";

export default function HomeLayout({ children }: PropsWithChildren) {

    return (
        <html lang="en">
            <body className="body" style={{overflowX: "hidden"}}>
                <NavBar/>
                {children}
            </body>
        </html>
    );

};