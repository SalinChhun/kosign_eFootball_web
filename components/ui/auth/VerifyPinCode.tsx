"use client";

import React, { useEffect, useState } from "react";
import useAuthMutation from "@/lib/hooks/useAuthMutation";
import { useRouter } from "next/navigation";
import { ConfirmPinCodeRequest } from "@/lib/types/auth";
import { Spinner } from "react-bootstrap";
import PinCodeExpiredTime from "@/components/ui/auth/PinCodeExpiredTime";
import Image from "next/image";

const VerifyPinCode = () => {
    const router = useRouter();
    const verifyPinCodeMutation = useAuthMutation.useVerifyPinCode();
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}`;

    const [email, setEmail] = useState("");
    const [pinCode, setPinCode] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setEmail(params.get("email") || "");
    }, []);

    useEffect(() => {
        const inputs = document.querySelectorAll<HTMLInputElement>("#otp > *[id]");

        const handleKeydown = (event: KeyboardEvent) => {
            const target = event.target as HTMLInputElement;

            // Allow only number keys (0-9) and control keys
            if (!(
                (event.key >= '0' && event.key <= '9') ||
                event.key === 'Backspace' ||
                event.key === 'Delete' ||
                event.key === 'Tab' ||
                event.key === 'ArrowLeft' ||
                event.key === 'ArrowRight'
            )) {
                event.preventDefault();
                return;
            }

            if (event.key === 'Backspace') {
                target.value = "";
                if (target.previousElementSibling) {
                    (target.previousElementSibling as HTMLInputElement).focus();
                }
                event.preventDefault();
            } else if (event.key >= '0' && event.key <= '9') {
                target.value = event.key;
                if (target.nextElementSibling) {
                    (target.nextElementSibling as HTMLInputElement).focus();
                }
                event.preventDefault();
            }

            updatePinCode(inputs);
        };

        // Handle paste event for convenience
        const handlePaste = (event: ClipboardEvent) => {
            event.preventDefault();
            const pastedData = event.clipboardData?.getData('text');

            if (!pastedData) return;

            // Extract only numbers from pasted data
            const numbers = pastedData.replace(/\D/g, '').slice(0, inputs.length);

            // Fill inputs with pasted numbers
            inputs.forEach((input, index) => {
                input.value = numbers[index] || '';
            });

            // Focus the next empty input or the last one
            const emptyInput = Array.from(inputs).find(input => input.value === '');
            if (emptyInput) {
                emptyInput.focus();
            } else if (inputs.length > 0) {
                inputs[inputs.length - 1].focus();
            }

            updatePinCode(inputs);
        };

        inputs.forEach(input => {
            input.addEventListener("keydown", handleKeydown);
            input.addEventListener("paste", handlePaste);
        });

        return () => {
            inputs.forEach(input => {
                input.removeEventListener("keydown", handleKeydown);
                input.removeEventListener("paste", handlePaste);
            });
        };
    }, []);

    const updatePinCode = (inputs: NodeListOf<HTMLInputElement>) => {
        let newPinCode = "";
        inputs.forEach(input => newPinCode += input.value);
        setPinCode(newPinCode);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const req: ConfirmPinCodeRequest = {
            email: email || "",
            pin_code: pinCode
        };
        verifyPinCodeMutation.mutation(req);
    };

    useEffect(() => {
        if (verifyPinCodeMutation.isSuccess) {
            router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        }
    }, [verifyPinCodeMutation.isSuccess, email, router]);

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
                    <h1 className="text-white h3 mt-3">Verify Pin Code</h1>
                </div>
                <form className="mt-4" onSubmit={handleFormSubmit}>
                    <div className="input-group uf-input-group input-group-lg mb-3">
                        <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <input
                                    key={index}
                                    id={`otp-input-${index}`}
                                    className="m-2 text-center form-control rounded"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={1}
                                    required
                                    autoComplete="off"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="d-grid mb-4">
                        <button type="submit" className="btn uf-btn-primary btn-lg">
                            {verifyPinCodeMutation.isLoading ? (
                                <Spinner animation="border" style={{ width: 18, height: 18, marginRight: 5 }} role="status">
                                    <span className="visually-hidden d-flex justify-content-center">Loading...</span>
                                </Spinner>
                            ) : (
                                "Verify"
                            )}
                        </button>
                        <PinCodeExpiredTime email={email} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyPinCode;