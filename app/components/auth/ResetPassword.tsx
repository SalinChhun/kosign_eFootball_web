"use client"
import React, {useState} from "react";
import useAuthMutation from "@/app/lib/hooks/useAuthMutation";
import {useRouter, useSearchParams} from "next/navigation";
import {Spinner} from "react-bootstrap";
import {ResetPasswordRequest} from "@/app/lib/types/auth";

const ResetPassword = () => {

    const searchParams = useSearchParams()
    const email = searchParams.get('email');
    const router = useRouter();
    const resetPasswordMutation = useAuthMutation.useResetPassword();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    console.log("resetPasswordMutation", resetPasswordMutation)
    const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const req : ResetPasswordRequest = {
            email: email || "",
            newPassword: newPassword,
            confirmNewPassword: confirmPassword
        }
        resetPasswordMutation.mutation(req);
    }

    if (resetPasswordMutation.isSuccess) {
        router.push(`/login`);
    }

    return (
        <div className="container">
            <div className="uf-form-signin">
                <div className="text-center">
                    <a href="https://uifresh.net/">
                        <img src="icon/besdong.jpg" alt="" width="100" height="100" className="img-banner"/>
                    </a>
                    <h1 className="text-white h3 mt-3">Forgot Password</h1>
                </div>
                <form className="mt-4" onSubmit={handleResetPassword}>
                    <div className="input-group uf-input-group input-group-lg mb-3">
                        <img src="icon/pass.png" className="input-group-text fa fa-user"/>
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
                        <img src="icon/pass.png" className="input-group-text fa fa-user"/>
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
                            {
                                resetPasswordMutation.isLoading ?
                                    <Spinner animation="border" style={{width: 18, height: 18, marginRight: 5}} role="status">
                                        <span className="visually-hidden d-flex justify-content-center">Loading...</span>
                                    </Spinner> : "Submit"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default ResetPassword;