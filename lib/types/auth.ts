export interface AuthRequest {
    email: string;
    password: string;
}

export interface SignUpRequest {
    firstname: string;
    lastname: string
    email: string;
    password: string;
    role: string;
}

export interface ConfirmPinCodeRequest {
    email: string;
    pin_code: string;
}

export interface ResetPasswordRequest {
    email: string;
    newPassword: string;
    confirmNewPassword: string;
}