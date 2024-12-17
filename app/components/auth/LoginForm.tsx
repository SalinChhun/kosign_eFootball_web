"use client";
import {useFormContextState} from "@/app/lib/hooks/useFormState";
import React, {useEffect, useReducer, useState} from "react";
import {useLoginStore} from "@/app/lib/store/store";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {useForm} from "react-hook-form";
import {GoogleAuthProvider, signInWithPopup} from "@firebase/auth";
import {auth, provider} from "@/utils/firebase";
import {Spinner} from "react-bootstrap";

export default function LoginForm() {
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;
    const {email, password, setEmail, setPassword} = useLoginStore();

    const router = useRouter()
    const searchParams = useSearchParams()

    const [loginRequest, dispatch] = useReducer((state: any, action: any) => {
        return {...state, ...action}
    }, {
        email: email || '',
        password: password || '',
        loginError: '',
        emailError: false,
        passwordError: false,
        submitting: false
    })

    function checkError(result: any) {
        if (result?.error == "User not found") {
            dispatch({loginError: result?.error!})
            dispatch({userIdError: true, passwordError: false})
            return;
        } else if (result?.error == "Password is incorrect") {
            dispatch({loginError: result.error!})
            dispatch({userIdError: false, passwordError: true})
            return;
        } else {
            dispatch({loginError: result?.error!})
            return;
        }
    }

    async function handleClick(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()
        if (loginRequest.submitting) return;
        dispatch({submitting: true})
        const toastId = toast.loading('Logging...')
        try {

            const url = new URL('/product', location.href)
            // url.searchParams.delete('start_date')
            // url.searchParams.delete('end_date')
            console.log("url", url)
            const result = await signIn("credentials", {
                email: loginRequest.email,
                password: loginRequest.password,
                callbackUrl: url.toString(),
                redirect: false,
                credentialType: 'login'
            })

            console.log("result", result?.url!)

            checkError(result);
            if (result?.ok) {
                router.push(result?.url!)
                return;
            }

            toast.error('Login failed')
        } catch (e) {
            console.log('error', e)

        } finally {
            toast.dismiss(toastId)
            dispatch({submitting: false})
        }
    }

    function handleChange(e: any) {
        dispatch({loginError: ''})
        dispatch({[e.target.name]: e.target.value})
        dispatch({[e.target.name + "Error"]: false})
    }

    // console.log("loginRequest.email", loginRequest.email)
    // console.log("loginRequest.password", loginRequest.password)


    const handleGoogleSignIn = async () => {
        // setIsClickGoogle(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log("credential", credential);
            console.log("result", result);
            const name = result?.user?.displayName;
            const email = result?.user?.email;
            const uuid = result?.user?.uid;
            const providerId = result?.providerId;

            try {
                const url = new URL("/product", location.href);
                // url.searchParams.delete('start_date')
                // url.searchParams.delete('end_date')
                console.log("url", url);
                const signInResult = await signIn("credentials", {
                    email: email,
                    password: uuid,
                    callbackUrl: url.toString(),
                    redirect: false,
                    credentialType: "thirdPartyLogin",
                });

                console.log("signInResult", signInResult?.url!);

                checkError(signInResult);
                if (signInResult?.ok) {
                    router.push(signInResult?.url!);
                    return;
                }

                toast.error("Login failed");
            } catch (signInError) {
                console.log("signInError", signInError);
            }
        } catch (err) {
            console.error("err", err);
            // toast.error(err);
        } finally {
            // toast.dismiss(toastId);
            dispatch({submitting: false});
        }
    };

    return (
        <div className="container">
            <form className="uf-form-signin mt-4" onSubmit={handleClick}>
                <div className="text-center">
                    <a href="https://uifresh.net/">
                        <img src="icon/sl-nhom-tv.jpg" alt="" width="100" height="100" className="img-banner"/>
                    </a>
                    <h1 className="text-white h3 mt-2 mb-3">Account Login</h1>
                </div>
                <div className="input-group uf-input-group input-group-lg mb-3">
                    {/*<span className="input-group-text fa fa-user"></span>*/}
                    <svg className="input-group-text fa fa-user" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">

                        <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

                        <g id="SVGRepo_iconCarrier">
                            <g id="style=fill">
                                <g id="profile">
                                    <path id="vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd"
                                          d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z"
                                          fill="#ffffff"/>
                                    <path id="rec (Stroke)" fill-rule="evenodd" clip-rule="evenodd"
                                          d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z"
                                          fill="#ffffff"/>
                                </g>
                            </g>
                        </g>

                    </svg>
                    <input
                        className="form-control"
                        onChange={handleChange}
                        required
                        value={loginRequest.userId}
                        type="email"
                        name="email"
                        placeholder="Username or Email address"
                        maxLength={150}/>
                </div>
                <div className="input-group uf-input-group input-group-lg mb-3">
                    <img src="icon/pass.png" className="input-group-text fa fa-user"/>
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        maxLength={50}
                        onChange={handleChange}
                        required
                        value={loginRequest.password}
                        name="password"
                    />
                </div>
                <div className="d-flex mb-3 justify-content-between">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input uf-form-check-input"
                               id="exampleCheck1"/>
                        <label className="form-check-label text-white" htmlFor="exampleCheck1">Remember
                            Me</label>
                    </div>
                    <a href={baseUrl + "/generate-pincode"}>Forgot password?</a>
                </div>
                <div className="d-grid mb-4">
                    <button type="submit" className="btn uf-btn-primary btn-lg">
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        {loginRequest.submitting ?
                            <Spinner animation="border" style={{ width: 18, height: 18, marginRight: 5 }} role="status">
                                <span className="visually-hidden d-flex justify-content-center">Loading...</span>
                            </Spinner> : 'Login'}
                    </button>
                </div>
                <div className="d-flex mb-3">
                    <div className="dropdown-divider m-auto w-25"></div>
                    <small className="text-nowrap text-white">Or login with</small>
                    <div className="dropdown-divider m-auto w-25"></div>
                </div>
                <div className="uf-social-login d-flex justify-content-center">
                    <a onClick={handleGoogleSignIn} className="uf-social-ic" title="Login with Google">
                        {/*<i className="fab fa-google"></i>*/}
                        <svg className="fab fa-google" width="20px" height="20px" viewBox="0 0 20 20" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" fill="#000000">

                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

                            <g id="SVGRepo_iconCarrier"><title>google [#178]</title>
                                <desc>Created with Sketch.</desc>
                                <defs></defs>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -7399.000000)"
                                       fill="#811818">
                                        <g id="icons" transform="translate(56.000000, 160.000000)">
                                            <path
                                                d="M263.821537,7247.00386 L254.211298,7247.00386 C254.211298,7248.0033 254.211298,7250.00218 254.205172,7251.00161 L259.774046,7251.00161 C259.560644,7252.00105 258.804036,7253.40026 257.734984,7254.10487 C257.733963,7254.10387 257.732942,7254.11086 257.7309,7254.10986 C256.309581,7255.04834 254.43389,7255.26122 253.041161,7254.98137 C250.85813,7254.54762 249.130492,7252.96451 248.429023,7250.95364 C248.433107,7250.95064 248.43617,7250.92266 248.439233,7250.92066 C248.000176,7249.67336 248.000176,7248.0033 248.439233,7247.00386 L248.438212,7247.00386 C249.003881,7245.1669 250.783592,7243.49084 252.969687,7243.0321 C254.727956,7242.65931 256.71188,7243.06308 258.170978,7244.42831 C258.36498,7244.23842 260.856372,7241.80579 261.043226,7241.6079 C256.0584,7237.09344 248.076756,7238.68155 245.090149,7244.51127 L245.089128,7244.51127 C245.089128,7244.51127 245.090149,7244.51127 245.084023,7244.52226 L245.084023,7244.52226 C243.606545,7247.38565 243.667809,7250.75975 245.094233,7253.48622 C245.090149,7253.48921 245.087086,7253.49121 245.084023,7253.49421 C246.376687,7256.0028 248.729215,7257.92672 251.563684,7258.6593 C254.574796,7259.44886 258.406843,7258.90916 260.973794,7256.58747 C260.974815,7256.58847 260.975836,7256.58947 260.976857,7256.59047 C263.15172,7254.63157 264.505648,7251.29445 263.821537,7247.00386"
                                                id="google-[#178]"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>

                        </svg>
                    </a>
                    <a className="uf-social-ic" title="Login with Twitter">
                        {/*<i className="fab fa-twitter"></i>*/}
                        <svg className="fab fa-twitter" width="20px" height="20px" viewBox="0 -2 20 20" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" fill="#000000">

                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

                            <g id="SVGRepo_iconCarrier"><title>twitter [#154]</title>
                                <desc>Created with Sketch.</desc>
                                <defs></defs>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Dribbble-Light-Preview" transform="translate(-60.000000, -7521.000000)"
                                       fill="#811818">
                                        <g id="icons" transform="translate(56.000000, 160.000000)">
                                            <path
                                                d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705"
                                                id="twitter-[#154]"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </a>
                    <a className="uf-social-ic" title="Login with Facebook">
                        {/*<i className="fab fa-facebook-f"></i>*/}
                        <svg className="fab fa-facebook-f" width="20px" height="20px" viewBox="-5 0 20 20" version="1.1"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="#883030" stroke="#883030">

                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

                            <g id="SVGRepo_iconCarrier"><title>facebook [#8a1919]</title>
                                <desc>Created with Sketch.</desc>
                                <defs></defs>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Dribbble-Light-Preview" transform="translate(-385.000000, -7399.000000)"
                                       fill="#811818">
                                        <g id="icons" transform="translate(56.000000, 160.000000)">
                                            <path
                                                d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z"
                                                id="facebook-[#8a1919]"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </a>
                </div>
                <div className="mt-4 text-center">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <span className="text-white">Don't have an account? </span>
                    <a href={baseUrl + "/signup"}>Sign Up</a>
                </div>
            </form>
        </div>
    )
}