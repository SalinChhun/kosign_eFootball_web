"use client";
import React, {useReducer} from "react";
import {useLoginStore} from "@/lib/store/store";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth, provider} from "@/utils/firebase";
import {Spinner} from "react-bootstrap";
import {Path} from "@/utils/enum";
import Image from "next/image";

export default function LoginForm() {
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}`;
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

    const handleGoogleSignIn = async () => {

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
                    <Image
                        src={`${baseUrl}/asset/icon/home-icon.svg`}
                        alt="Logo"
                        width={100}
                        height={100}
                        className="img-banner mx-auto"
                        priority
                    />
                    <h1 className="text-white h3 mt-3 mb-3">Account Login</h1>
                </div>
                <div className="input-group uf-input-group input-group-lg mb-3">
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
                    <svg fill="#fff" className="input-group-text fa fa-user" viewBox="0 0 20 20">
                        <path
                            d="M15 6.66597H14.167V4.99997C14.15 3.90613 13.7036 2.86282 12.9241 2.09527C12.1446 1.32773 11.0945 0.897522 10.0005 0.897522C8.90652 0.897522 7.85642 1.32773 7.07689 2.09527C6.29736 2.86282 5.85094 3.90613 5.83399 4.99997V6.66597H4.99999C4.55828 6.66729 4.13504 6.84334 3.8227 7.15568C3.51036 7.46802 3.33431 7.89126 3.33299 8.33297V16.666C3.33431 17.1077 3.51036 17.5309 3.8227 17.8433C4.13504 18.1556 4.55828 18.3317 4.99999 18.333H15C15.4417 18.3317 15.8649 18.1556 16.1773 17.8433C16.4896 17.5309 16.6657 17.1077 16.667 16.666V8.33297C16.6657 7.89126 16.4896 7.46802 16.1773 7.15568C15.8649 6.84334 15.4417 6.66729 15 6.66597ZM9.99999 14.166C9.67029 14.166 9.34799 14.0682 9.07386 13.885C8.79972 13.7019 8.58606 13.4415 8.45989 13.1369C8.33371 12.8323 8.3007 12.4971 8.36502 12.1738C8.42935 11.8504 8.58811 11.5534 8.82125 11.3202C9.05438 11.0871 9.35141 10.9283 9.67478 10.864C9.99814 10.7997 10.3333 10.8327 10.6379 10.9589C10.9425 11.085 11.2029 11.2987 11.3861 11.5728C11.5692 11.847 11.667 12.1693 11.667 12.499C11.6657 12.9407 11.4896 13.3639 11.1773 13.6763C10.8649 13.9886 10.4417 14.1647 9.99999 14.166ZM12.583 6.66597H7.41599V4.99997C7.41599 4.31478 7.68818 3.65766 8.17268 3.17316C8.65718 2.68866 9.31431 2.41647 9.99949 2.41647C10.6847 2.41647 11.3418 2.68866 11.8263 3.17316C12.3108 3.65766 12.583 4.31478 12.583 4.99997V6.66597Z"/>
                    </svg>
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
                    <a href={Path.OTP}>Forgot password?</a>
                </div>
                <div className="d-grid mb-4">
                    <button type="submit" className="btn uf-btn-primary btn-lg">
                        {loginRequest.submitting ?
                            <Spinner animation="border" style={{width: 18, height: 18, marginRight: 5}} role="status">
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
                        <svg className="fab fa-google" width="20px" height="20px" viewBox="0 0 20 20" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" fill="#000000">

                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

                            <g id="SVGRepo_iconCarrier"><title>google [#178]</title>
                                <desc>Created with Sketch.</desc>
                                <defs></defs>
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g className="third-party-logo" id="Dribbble-Light-Preview" transform="translate(-300.000000, -7399.000000)"
                                       fill="#cdbc6d">
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

                    <a className="uf-social-ic" title="Login with Facebook">
                        <svg className="fab fa-facebook-f" width="20px" height="20px" viewBox="-5 0 20 20" version="1.1"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="#883030" stroke="#883030">

                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

                            <g id="SVGRepo_iconCarrier"><title>facebook [#8a1919]</title>
                                <desc>Created with Sketch.</desc>
                                <defs></defs>
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g className="third-party-logo" id="Dribbble-Light-Preview" transform="translate(-385.000000, -7399.000000)"
                                       fill="#cdbc6d">
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
                    <span className="text-white">Don&apos;t have an account? </span>
                    <a href={Path.SIGNUP}>Sign Up</a>
                </div>
            </form>
        </div>
    )
}