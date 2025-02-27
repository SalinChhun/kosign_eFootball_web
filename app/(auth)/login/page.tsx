import LoginForm from "@/components/ui/auth/LoginForm";
import {getServerSession} from "next-auth";
import {authOption} from "@/lib/session/auth";
import {redirect} from "next/navigation";

export const metadata = {
    title: 'Phone Shop | Log In',
    description: 'Generated by Next.js',
}

const Login = async () => {

    const session = await getServerSession(authOption);
    console.log("session", session)

    if (session){
        redirect("/")
    }

    return <LoginForm />;
};

export default Login;
