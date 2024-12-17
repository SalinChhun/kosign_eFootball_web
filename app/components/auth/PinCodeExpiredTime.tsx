import React, { useEffect, useState } from "react";
import useAuthMutation from "@/app/lib/hooks/useAuthMutation";
import {Spinner} from "react-bootstrap";

const PinCodeExpiredTime = ({ email }: { email: any }) => {

    const generatePinCodeMutation = useAuthMutation.useGeneratePinCode();
    const [seconds, setSeconds] = useState(60);

    console.log("generatePinCodeMutation.data", generatePinCodeMutation.data);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (seconds > 0) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        }

        return () => clearInterval(intervalId); // Cleanup function to clear the interval
    }, [seconds]); // Run effect whenever seconds change

    const handleResendClick = () => {
        generatePinCodeMutation.mutation(email);
        setSeconds(60);
    };

    return (
        <div className="pin-time">
            {seconds > 0 ? (
                <p>Time Remaining: {seconds}</p>
            ) : (
                <a onClick={handleResendClick} type="button" className="btn uf-btn-primary btn-lg btn-resend">
                    {
                        generatePinCodeMutation.isLoading ?
                            <Spinner animation="border" style={{width: 18, height: 18, marginRight: 5}} role="status">
                                <span className="visually-hidden d-flex justify-content-center">Loading...</span>
                            </Spinner> : "Resend"
                    }
                </a>
            )}
        </div>
    );
};

export default PinCodeExpiredTime;
