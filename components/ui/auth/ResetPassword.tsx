"use client";

import React, { useState, useEffect } from "react";
import useAuthMutation from "@/lib/hooks/useAuthMutation";
import { useRouter } from "next/navigation";
import { Spinner } from "react-bootstrap";
import { ResetPasswordRequest } from "@/lib/types/auth";
import Image from "next/image";

const ResetPassword = () => {
    const router = useRouter();
    const resetPasswordMutation = useAuthMutation.useResetPassword();
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}`;
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    // Extract email from URL manually
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setEmail(params.get("email") || "");
    }, []);

    const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const req: ResetPasswordRequest = {
            email: email,
            newPassword: newPassword,
            confirmNewPassword: confirmPassword,
        };
        resetPasswordMutation.mutation(req);
    };

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
                    <h1 className="text-white h3 mt-3">Forgot Password</h1>
                </div>
                <form className="mt-4" onSubmit={handleResetPassword}>
                    <div className="input-group uf-input-group input-group-lg mb-3">
                        <svg fill="#fff" className="input-group-text fa fa-user" viewBox="0 0 20 20">
                            <path
                                d="M15 6.66597H14.167V4.99997C14.15 3.90613 13.7036 2.86282 12.9241 2.09527C12.1446 1.32773 11.0945 0.897522 10.0005 0.897522C8.90652 0.897522 7.85642 1.32773 7.07689 2.09527C6.29736 2.86282 5.85094 3.90613 5.83399 4.99997V6.66597H4.99999C4.55828 6.66729 4.13504 6.84334 3.8227 7.15568C3.51036 7.46802 3.33431 7.89126 3.33299 8.33297V16.666C3.33431 17.1077 3.51036 17.5309 3.8227 17.8433C4.13504 18.1556 4.55828 18.3317 4.99999 18.333H15C15.4417 18.3317 15.8649 18.1556 16.1773 17.8433C16.4896 17.5309 16.6657 17.1077 16.667 16.666V8.33297C16.6657 7.89126 16.4896 7.46802 16.1773 7.15568C15.8649 6.84334 15.4417 6.66729 15 6.66597ZM9.99999 14.166C9.67029 14.166 9.34799 14.0682 9.07386 13.885C8.79972 13.7019 8.58606 13.4415 8.45989 13.1369C8.33371 12.8323 8.3007 12.4971 8.36502 12.1738C8.42935 11.8504 8.58811 11.5534 8.82125 11.3202C9.05438 11.0871 9.35141 10.9283 9.67478 10.864C9.99814 10.7997 10.3333 10.8327 10.6379 10.9589C10.9425 11.085 11.2029 11.2987 11.3861 11.5728C11.5692 11.847 11.667 12.1693 11.667 12.499C11.6657 12.9407 11.4896 13.3639 11.1773 13.6763C10.8649 13.9886 10.4417 14.1647 9.99999 14.166ZM12.583 6.66597H7.41599V4.99997C7.41599 4.31478 7.68818 3.65766 8.17268 3.17316C8.65718 2.68866 9.31431 2.41647 9.99949 2.41647C10.6847 2.41647 11.3418 2.68866 11.8263 3.17316C12.3108 3.65766 12.583 4.31478 12.583 4.99997V6.66597Z"/>
                        </svg>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="New Password"
                            maxLength={50}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            name="password"
                        />
                    </div>
                    <div className="input-group uf-input-group input-group-lg mb-3">
                        <svg fill="#fff" className="input-group-text fa fa-user" viewBox="0 0 20 20">
                            <path
                                d="M15 6.66597H14.167V4.99997C14.15 3.90613 13.7036 2.86282 12.9241 2.09527C12.1446 1.32773 11.0945 0.897522 10.0005 0.897522C8.90652 0.897522 7.85642 1.32773 7.07689 2.09527C6.29736 2.86282 5.85094 3.90613 5.83399 4.99997V6.66597H4.99999C4.55828 6.66729 4.13504 6.84334 3.8227 7.15568C3.51036 7.46802 3.33431 7.89126 3.33299 8.33297V16.666C3.33431 17.1077 3.51036 17.5309 3.8227 17.8433C4.13504 18.1556 4.55828 18.3317 4.99999 18.333H15C15.4417 18.3317 15.8649 18.1556 16.1773 17.8433C16.4896 17.5309 16.6657 17.1077 16.667 16.666V8.33297C16.6657 7.89126 16.4896 7.46802 16.1773 7.15568C15.8649 6.84334 15.4417 6.66729 15 6.66597ZM9.99999 14.166C9.67029 14.166 9.34799 14.0682 9.07386 13.885C8.79972 13.7019 8.58606 13.4415 8.45989 13.1369C8.33371 12.8323 8.3007 12.4971 8.36502 12.1738C8.42935 11.8504 8.58811 11.5534 8.82125 11.3202C9.05438 11.0871 9.35141 10.9283 9.67478 10.864C9.99814 10.7997 10.3333 10.8327 10.6379 10.9589C10.9425 11.085 11.2029 11.2987 11.3861 11.5728C11.5692 11.847 11.667 12.1693 11.667 12.499C11.6657 12.9407 11.4896 13.3639 11.1773 13.6763C10.8649 13.9886 10.4417 14.1647 9.99999 14.166ZM12.583 6.66597H7.41599V4.99997C7.41599 4.31478 7.68818 3.65766 8.17268 3.17316C8.65718 2.68866 9.31431 2.41647 9.99949 2.41647C10.6847 2.41647 11.3418 2.68866 11.8263 3.17316C12.3108 3.65766 12.583 4.31478 12.583 4.99997V6.66597Z"/>
                        </svg>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Confirm Password"
                            maxLength={50}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            name="password"
                        />
                    </div>
                    <div className="d-grid mb-4">
                        <button type="submit" className="btn uf-btn-primary btn-lg">
                            {resetPasswordMutation.isLoading ? (
                                <Spinner animation="border" style={{width: 18, height: 18, marginRight: 5}}
                                         role="status">
                                    <span className="visually-hidden d-flex justify-content-center">Loading...</span>
                                </Spinner>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
