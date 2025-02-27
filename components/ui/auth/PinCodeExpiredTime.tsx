import React, { useEffect, useState } from "react";
import useAuthMutation from "@/lib/hooks/useAuthMutation";
import { Spinner } from "react-bootstrap";

const PinCodeExpiredTime = ({ email }: { email: string }) => {

    const generatePinCodeMutation = useAuthMutation.useGeneratePinCode();
    console.log("Pin code ->>>", generatePinCodeMutation.data?.data?.data?.pin_code);
    const [seconds, setSeconds] = useState(60);
    const [showTimer, setShowTimer] = useState(true);

    // Handle successful pin code generation
    useEffect(() => {
        if (generatePinCodeMutation.isSuccess) {
            setShowTimer(true);
            setSeconds(60);
        }
    }, [generatePinCodeMutation.isSuccess]);

    // Timer countdown effect
    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (seconds > 0 && showTimer) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            setShowTimer(false);
        }

        return () => clearInterval(intervalId);
    }, [seconds, showTimer]);

    const handleResendClick = () => {
        generatePinCodeMutation.mutation(email);
    };

    return (
        <div className="pin-time">
            {showTimer ? (
                <p className="text-white">Time Remaining: {seconds}</p>
            ) : (
                <a
                    onClick={handleResendClick}
                    type="button"
                    className="text-white btn btn-lg btn-resend p-0"
                    style={{ cursor: 'pointer' }}
                >
                    {generatePinCodeMutation.isLoading ? (
                        <Spinner animation="border" style={{width: 18, height: 18}} role="status">
                            <span className="visually-hidden d-flex justify-content-center">Loading...</span>
                        </Spinner>
                    ) : (
                        "Resend"
                    )}
                </a>
            )}
        </div>
    );
};

export default PinCodeExpiredTime;