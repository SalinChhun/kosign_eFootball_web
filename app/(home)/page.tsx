"use client"

import {useEffect, useState} from "react";
import OneSignal from "react-onesignal";

export default function Home() {

    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;


    // useEffect(() => {
    //     OneSignal.init({
    //         appId: "8e9fd054-8741-46a3-8aff-13052e5688ec",
    //         notifyButton: {
    //             enable: true,
    //         },
    //         allowLocalhostAsSecureOrigin: true,
    //     });
    // }, []);



    return (
        <>
            <h1>This is landing page </h1>
            <a href={baseUrl + "/login"}>
                <button>Signin</button>
            </a>

        </>
    );
};