import {PropsWithChildren} from "react";
import "@/styles/ps-boostrap.css";
import "@/styles/globals.css";
import "@/styles/we-football.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NextAuthProvider from "@/app/(auth)/NextAuthProvider";
import NavBar from "@/components/shared/NavBar";


const RootLayout = async ({
  children
}: PropsWithChildren) => {

    return (
        <html lang="en">
        <body>
        <NextAuthProvider>
            <div className="ks_d_flex ks_flex_col ks_flex_root">
                <div className="ks_d_flex ks_flex_col ks_flex_col_fluid">
                    {/*<Navbar/>*/}
                    <div className="ks_d_flex ks_flex_col ks_flex_row_fluid" id="ks_wt_app_wrapper">
                        {/*<Sidebar/>*/}
                        <NavBar/>
                        {children}
                    </div>
                </div>
            </div>
        </NextAuthProvider>
        </body>
        </html>
    );
};

export default RootLayout;

