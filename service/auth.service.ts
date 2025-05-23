
import {AuthRequest, SignUpRequest} from "@/lib/types/auth";
import {http} from "@/utils/http";


const ServiceId = {
    LOGIN: '/api/v1/auth/login',
    LOGOUT: '/api/wb/v1/auth/logout',
    THIRD_PARTY_LOGIN: '/api/v1/auth/third-party/login',
    SIGNUP: '/api/v1/auth/register',
    GENERATE_PIN_CODE: '/api/v1/auth/generatePinCode',
    VERIFY_PIN_CODE: '/api/v1/auth/confirmPinCode',
    RESET_PASSWORD: '/api/v1/auth/resetPassword'
}

const signup = (data: SignUpRequest) => {
    return http.post(ServiceId.SIGNUP, data);
}

const login = (data: AuthRequest) => {
    return http.post(ServiceId.LOGIN, data);
}

const logout = () => {
    return http.post(ServiceId.LOGOUT);
}

const thirdPartyLogin = (data: AuthRequest) => {
    return http.post(ServiceId.THIRD_PARTY_LOGIN, data);
}

const generatePinCode = (email: any) => {
    return http.post(ServiceId.GENERATE_PIN_CODE + `?email=${email}`);
}

const verifyPinCode = (email: any, pinCode: any) => {
    return http.post(ServiceId.VERIFY_PIN_CODE + `?email=${email}&pinCode=${pinCode}`);
}

const resetPassword = (data: any) => {
    return http.put(ServiceId.RESET_PASSWORD, data);
}

export const authService = {
    signup,
    login,
    logout,
    thirdPartyLogin,
    generatePinCode,
    verifyPinCode,
    resetPassword
}

export default authService;