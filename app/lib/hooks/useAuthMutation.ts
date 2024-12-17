import {useMutation} from "@tanstack/react-query";
import authService from "@/app/service/auth.service";
import toast from "react-hot-toast";
import {ConfirmPinCodeRequest, ResetPasswordRequest, SignUpRequest} from "@/app/lib/types/auth";

const signup = (registerRequest: SignUpRequest) => {
    return authService.signup(registerRequest)
}

const useSignup = () => {

    const mutation = useMutation((req: SignUpRequest) => signup(req),{
        onError: (error: any) => {
            toast.error(error?.message)
        },
        onSuccess: (data: any) => {
            toast.success('Register Successfully')
        }
    })

    return {
        mutation: mutation.mutate,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
    }
}

const useGeneratePinCode = () => {

    const mutation = useMutation((req: any) => authService.generatePinCode(req),{
        onError: (error: any) => {
            toast.error(error?.message)
        },
        onSuccess: (data: any) => {
            toast.success('Generate pin code successfully please check your email')
        }
    })

    return {
        mutation: mutation.mutate,
        isLoading: mutation.isLoading,
        data: mutation.data,
        isSuccess: mutation.isSuccess,
    }
}

const useVerifyPinCode = () => {

    const mutation = useMutation((req: ConfirmPinCodeRequest) => authService.verifyPinCode(req.email, req.pin_code),{
        onError: (error: any) => {
            toast.error(error?.message)
        },
        onSuccess: (data: any) => {
            toast.success('Verify pin code successfully')
        }
    })

    return {
        mutation: mutation.mutate,
        isLoading: mutation.isLoading,
        data: mutation.data,
        isSuccess: mutation.isSuccess,
    }
}

const useResetPassword = () => {

    const mutation = useMutation((req: ResetPasswordRequest) => authService.resetPassword(req),{
        onError: (error: any) => {
            toast.error(error?.message)
        },
        onSuccess: (data: any) => {
            toast.success('Reset password successfully')
        }
    })

    return {
        mutation: mutation.mutate,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
    }
}




export const useAuthMutation = {
    useSignup,
    useGeneratePinCode,
    useVerifyPinCode,
    useResetPassword
}

export default useAuthMutation;