"use client"
import React, {useEffect, useState} from "react";
import useAuthMutation from "@/app/lib/hooks/useAuthMutation";
import {useRouter, useSearchParams} from "next/navigation";
import {ConfirmPinCodeRequest} from "@/app/lib/types/auth";
import {button} from "@material-tailwind/react";
import PinCodeExpiredTime from "@/app/components/auth/PinCodeExpiredTime";
import {Spinner} from "react-bootstrap";

const VerifyPinCode = () => {

    const router = useRouter();
    const searchParams = useSearchParams()
    const verifyPinCodeMutation = useAuthMutation.useVerifyPinCode();
    const email = searchParams.get('email')
    const [pinCode, setPinCode] = useState("");

    useEffect(() => {
        const inputs = document.querySelectorAll<HTMLInputElement>('#otp > *[id]');

        const handleKeydown = (event: KeyboardEvent) => {
            const target = event.target as HTMLInputElement;
            const maxLength = parseInt(target.getAttribute("maxlength") || "0");

            if (event.key === "Backspace") {
                target.value = "";
                if (target.previousElementSibling) {
                    (target.previousElementSibling as HTMLInputElement).focus();
                }
            } else if (event.keyCode >= 48 && event.keyCode <= 57) {
                // Only allow numeric values
                if (target.value.length < maxLength) {
                    target.value = event.key;
                    if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLInputElement).focus();
                    }
                }
            }
            event.preventDefault();
            updatePinCode(inputs);
        };

        inputs.forEach(input => {
            input.addEventListener('keydown', handleKeydown);
        });

        return () => {
            inputs.forEach(input => {
                input.removeEventListener('keydown', handleKeydown);
            });
        };
    }, []);

    const updatePinCode = (inputs: NodeListOf<HTMLInputElement>) => {
        let newPinCode = "";
        inputs.forEach(input => {
            newPinCode += input.value;
        });
        setPinCode(newPinCode);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const req: ConfirmPinCodeRequest = {
            email: email || "",
            pin_code: pinCode
        }
        verifyPinCodeMutation.mutation(req);
    };

    if (verifyPinCodeMutation.isSuccess) {
        const queryString = `?email=${encodeURIComponent(email || "")}`;
        router.push(`/reset-password${queryString}`);
    }

    return (
        <div className="container">
            <div className="uf-form-signin">
                <div className="text-center">
                    <a href="https://uifresh.net/">
                        <img src="icon/besdong.jpg" alt="" width="100" height="100" className="img-banner"/>
                    </a>
                    <h1 className="text-white h3 mt-3">Verify Pin Code</h1>
                </div>
                <form className="mt-4" onSubmit={handleFormSubmit}>
                    <div className="input-group uf-input-group input-group-lg mb-3">
                        <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">
                            <input
                                className="m-2 text-center form-control rounded"
                                type="text"
                                id="first"
                                maxLength={1}
                                required
                            />
                            <input
                                className="m-2 text-center form-control rounded"
                                type="text" id="second"
                                maxLength={1}
                                required
                            />
                            <input
                                className="m-2 text-center form-control rounded"
                                type="text"
                                id="third"
                                maxLength={1}
                                required
                            />
                            <input
                                className="m-2 text-center form-control rounded"
                                type="text"
                                id="fourth"
                                maxLength={1}
                                required
                            />
                            <input
                                className="m-2 text-center form-control rounded"
                                type="text"
                                id="fifth"
                                maxLength={1}
                                required
                            />
                            <input
                                className="m-2 text-center form-control rounded"
                                type="text"
                                id="sixth"
                                maxLength={1}
                                required
                            />
                        </div>
                    </div>
                    <div className="d-grid mb-4">
                        <button type="submit" className="btn uf-btn-primary btn-lg">
                            {
                                verifyPinCodeMutation.isLoading ?
                                    <Spinner animation="border" style={{width: 18, height: 18, marginRight: 5}} role="status">
                                        <span className="visually-hidden d-flex justify-content-center">Loading...</span>
                                    </Spinner> : "Verify"
                            }
                        </button>
                        <PinCodeExpiredTime email={email}/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VerifyPinCode;
