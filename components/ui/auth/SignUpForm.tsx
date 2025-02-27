"use client"
import React, {useState} from "react";
import {SignUpRequest} from "@/lib/types/auth";
import useAuthMutation from "@/lib/hooks/useAuthMutation";
import Image from "next/image";
import {Path} from "@/utils/enum";

const SignUpForm = () => {

    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}`;
    const signupMutation = useAuthMutation.useSignup();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const request: SignUpRequest = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            role: "USER"
        };

        signupMutation.mutation(request);
    }


    return (
        <div className="container">
            <div className="uf-form-signin mt-4">
                <div className="text-center">
                    <Image
                        src={`${baseUrl}/asset/icon/home-icon.svg`}
                        alt="Logo"
                        width={100}
                        height={100}
                        className="img-banner mx-auto"
                        priority
                    />
                    <h1 className="text-white h3 mt-3">Account Register</h1>
                </div>
                <form className="mt-4" onSubmit={handleSignup}>
                    <div className="input-group uf-input-group input-group-lg mb-3">
                        {/*<span className="input-group-text fa fa-user"></span>*/}
                        <svg className="input-group-text fa fa-user" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">

                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

                            <g id="SVGRepo_iconCarrier">
                                <g id="style=fill">
                                    <g id="profile">
                                        <path id="vector (Stroke)" fillRule="evenodd" clipRule="evenodd"
                                              d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z"
                                              fill="#ffffff"/>
                                        <path id="rec (Stroke)" fillRule="evenodd" clipRule="evenodd"
                                              d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z"
                                              fill="#ffffff"/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Name"
                        />
                    </div>
                    <div className="input-group uf-input-group input-group-lg mb-3">
                        <svg style={{fill: "white"}} className="input-group-text fa fa-envelope" version="1.1"
                             id="_x32_" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512"
                             fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

                            <g id="SVGRepo_iconCarrier">
                                <style type="text/css"></style>
                                <g>
                                    <path className="st0"
                                          d="M440.917,67.925H71.083C31.827,67.925,0,99.752,0,139.008v233.984c0,39.256,31.827,71.083,71.083,71.083 h369.834c39.255,0,71.083-31.827,71.083-71.083V139.008C512,99.752,480.172,67.925,440.917,67.925z M178.166,321.72l-99.54,84.92 c-7.021,5.992-17.576,5.159-23.567-1.869c-5.992-7.021-5.159-17.576,1.87-23.567l99.54-84.92c7.02-5.992,17.574-5.159,23.566,1.87 C186.027,305.174,185.194,315.729,178.166,321.72z M256,289.436c-13.314-0.033-26.22-4.457-36.31-13.183l0.008,0.008l-0.032-0.024 c0.008,0.008,0.017,0.008,0.024,0.016L66.962,143.694c-6.98-6.058-7.723-16.612-1.674-23.583c6.057-6.98,16.612-7.723,23.582-1.674 l152.771,132.592c3.265,2.906,8.645,5.004,14.359,4.971c5.706,0.017,10.995-2.024,14.44-5.028l0.074-0.065l152.615-132.469 c6.971-6.049,17.526-5.306,23.583,1.674c6.048,6.97,5.306,17.525-1.674,23.583l-152.77,132.599 C282.211,284.929,269.322,289.419,256,289.436z M456.948,404.771c-5.992,7.028-16.547,7.861-23.566,1.869l-99.54-84.92 c-7.028-5.992-7.861-16.546-1.869-23.566c5.991-7.029,16.546-7.861,23.566-1.87l99.54,84.92 C462.107,387.195,462.94,397.75,456.948,404.771z"/>
                                </g>
                            </g>

                        </svg>
                        <input
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Email address"
                        />
                    </div>
                    <div className="input-group uf-input-group input-group-lg mb-3">
                        <svg fill="#fff" className="input-group-text fa fa-user" viewBox="0 0 20 20">
                            <path
                                d="M15 6.66597H14.167V4.99997C14.15 3.90613 13.7036 2.86282 12.9241 2.09527C12.1446 1.32773 11.0945 0.897522 10.0005 0.897522C8.90652 0.897522 7.85642 1.32773 7.07689 2.09527C6.29736 2.86282 5.85094 3.90613 5.83399 4.99997V6.66597H4.99999C4.55828 6.66729 4.13504 6.84334 3.8227 7.15568C3.51036 7.46802 3.33431 7.89126 3.33299 8.33297V16.666C3.33431 17.1077 3.51036 17.5309 3.8227 17.8433C4.13504 18.1556 4.55828 18.3317 4.99999 18.333H15C15.4417 18.3317 15.8649 18.1556 16.1773 17.8433C16.4896 17.5309 16.6657 17.1077 16.667 16.666V8.33297C16.6657 7.89126 16.4896 7.46802 16.1773 7.15568C15.8649 6.84334 15.4417 6.66729 15 6.66597ZM9.99999 14.166C9.67029 14.166 9.34799 14.0682 9.07386 13.885C8.79972 13.7019 8.58606 13.4415 8.45989 13.1369C8.33371 12.8323 8.3007 12.4971 8.36502 12.1738C8.42935 11.8504 8.58811 11.5534 8.82125 11.3202C9.05438 11.0871 9.35141 10.9283 9.67478 10.864C9.99814 10.7997 10.3333 10.8327 10.6379 10.9589C10.9425 11.085 11.2029 11.2987 11.3861 11.5728C11.5692 11.847 11.667 12.1693 11.667 12.499C11.6657 12.9407 11.4896 13.3639 11.1773 13.6763C10.8649 13.9886 10.4417 14.1647 9.99999 14.166ZM12.583 6.66597H7.41599V4.99997C7.41599 4.31478 7.68818 3.65766 8.17268 3.17316C8.65718 2.68866 9.31431 2.41647 9.99949 2.41647C10.6847 2.41647 11.3418 2.68866 11.8263 3.17316C12.3108 3.65766 12.583 4.31478 12.583 4.99997V6.66597Z"/>
                        </svg>
                        <input
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <div className="d-grid mb-4">
                        <button type="submit" className="btn uf-btn-primary btn-lg">Sign Up
                        </button>
                    </div>
                    <div className="mt-4 text-center">
                        <span className="text-white">Already a member? </span>
                        <a href={Path.LOGIN}>Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
