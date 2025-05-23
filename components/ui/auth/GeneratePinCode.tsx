"use client"
import React, {useEffect, useState} from "react";
import useAuthMutation from "@/lib/hooks/useAuthMutation";
import {useRouter} from "next/navigation";
import {Spinner} from "react-bootstrap";
import Image from "next/image";

const GeneratePinCode = () => {

    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}`;
    const router = useRouter();
    const generatePinCodeMutation = useAuthMutation.useGeneratePinCode();
    console.log("Pin code ->>>", generatePinCodeMutation.data?.data?.data?.pin_code);
    const [email, setEmail] = useState("")
    const handleGeneratePinCode = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        generatePinCodeMutation.mutation(email);
    }

    useEffect(() => {
        if (generatePinCodeMutation.isSuccess) {
            const queryString = `?email=${encodeURIComponent(email)}`;
            router.push(`/verify-pincode${queryString}`);
        }
    }, [generatePinCodeMutation.isSuccess, email, router]);

    return (
        <div className="container">
            <div className="uf-form-signin mt-4">
                <div className="text-center">
                    <a href="https://uifresh.net/">
                        <Image
                            src={`${baseUrl}/asset/icon/home-icon.svg`}
                            alt="Logo"
                            width={100}
                            height={100}
                            className="img-banner mx-auto"
                            priority
                        />
                    </a>
                    <h1 className="text-white h3 mt-3">Forgot Password</h1>
                </div>
                <form className="mt-4" onSubmit={handleGeneratePinCode}>
                    <div className="input-group uf-input-group input-group-lg mb-3">
                        <svg
                            style={{fill: "white"}}
                            className="input-group-text fa fa-envelope"
                            version="1.1"
                            id="_x32_" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                            <g id="SVGRepo_iconCarrier">
                                <style type="text/css"></style>
                                <g>
                                    <path
                                        className="st0"
                                        d="M440.917,67.925H71.083C31.827,67.925,0,99.752,0,139.008v233.984c0,39.256,31.827,71.083,71.083,71.083 h369.834c39.255,0,71.083-31.827,71.083-71.083V139.008C512,99.752,480.172,67.925,440.917,67.925z M178.166,321.72l-99.54,84.92 c-7.021,5.992-17.576,5.159-23.567-1.869c-5.992-7.021-5.159-17.576,1.87-23.567l99.54-84.92c7.02-5.992,17.574-5.159,23.566,1.87 C186.027,305.174,185.194,315.729,178.166,321.72z M256,289.436c-13.314-0.033-26.22-4.457-36.31-13.183l0.008,0.008l-0.032-0.024 c0.008,0.008,0.017,0.008,0.024,0.016L66.962,143.694c-6.98-6.058-7.723-16.612-1.674-23.583c6.057-6.98,16.612-7.723,23.582-1.674 l152.771,132.592c3.265,2.906,8.645,5.004,14.359,4.971c5.706,0.017,10.995-2.024,14.44-5.028l0.074-0.065l152.615-132.469 c6.971-6.049,17.526-5.306,23.583,1.674c6.048,6.97,5.306,17.525-1.674,23.583l-152.77,132.599 C282.211,284.929,269.322,289.419,256,289.436z M456.948,404.771c-5.992,7.028-16.547,7.861-23.566,1.869l-99.54-84.92 c-7.028-5.992-7.861-16.546-1.869-23.566c5.991-7.029,16.546-7.861,23.566-1.87l99.54,84.92 C462.107,387.195,462.94,397.75,456.948,404.771z"
                                    />
                                </g>
                            </g>
                        </svg>
                        <input
                            required
                            onChange={(e) => setEmail(e.target.value)} type="text"
                            className="form-control"
                            placeholder="Email address"
                        />
                    </div>
                    <div className="d-grid mb-4">
                        <button type="submit" className="btn uf-btn-primary btn-lg">
                            {
                                generatePinCodeMutation.isLoading ?
                                <Spinner animation="border" style={{ width: 18, height: 18, marginRight: 5 }} role="status">
                                    <span className="visually-hidden d-flex justify-content-center">Loading...</span>
                                </Spinner> : "Continue"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default GeneratePinCode;