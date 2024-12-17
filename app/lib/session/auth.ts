import {JWT} from "next-auth/jwt";
import NextAuth, {NextAuthOptions, User, Session} from "next-auth";
import {AuthRequest} from "@/app/lib/types/auth";
import authService from "@/app/service/auth.service";
import CredentialsProvider from "next-auth/providers/credentials"
import {PasswordUtils} from "@/utils/PasswordUtils";

export const jwt = async ({token, user}: { token: JWT; user?: User }) => {

    if (user) {
        token.token = user.access_token
    }
    return {...token, ...user};
};

export const session = ({session, token}: { session: Session; token: JWT }): Promise<Session> => {

    if (Date.now() / 1000 > token?.accessTokenExpires) {
        return Promise.reject({
            error: new Error("Refresh token has expired. Please log in again to get a new refresh token."),
        });
    }
    const accessTokenData = JSON.parse(atob(token.token?.split(".")?.at(1)!));

    session.user = accessTokenData;
    token.accessTokenExpires = accessTokenData.exp;

    // @ts-ignore
    session.token = token?.token;

    return Promise.resolve(session);
};

export const authOption: NextAuthOptions = ({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
                credentialType: {}
            },
            async authorize(credentials, req) {
                const authRequest: AuthRequest = {
                    email: credentials?.email!,
                    // password: PasswordUtils.encrypt(credentials?.password!)
                    password: credentials?.password!,
                }

                console.log("auth request", credentials?.credentialType)

                if (credentials?.credentialType === "login") {
                    const response = await authService.login(authRequest)
                        .catch(err => err);
                    console.log(response?.data);
                    if (response.status === 200) {
                        return response.data;
                    }
                    throw new Error(response?.message || "Invalid username or password")
                } else if (credentials?.credentialType === "thirdPartyLogin") {
                    const response = await authService.thirdPartyLogin(authRequest)
                        .catch(err => err);
                    console.log(response?.data);
                    if (response.status === 200) {
                        return response.data;
                    }
                    throw new Error(response?.message || "Invalid username or password")
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: (2 * 60 - 2) * 60, // 2 hours
    },
    callbacks: {
        jwt,
        session
    },
    pages: {
        signIn: '/login'
    }
})

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as
     * a prop on the `SessionProvider` React Context
     */
    interface Session {
        refreshTokenExpires?: number;
        accessTokenExpires?: string;
        refreshToken?: string;
        token?: string;
        error?: string;
        user?: User;
    }

    interface User {
        // status: {
        //     code: number;
        //     message: string;
        // };
        // data: {
        //     access_token: string;
        //     token_type: string;
        //     expires_in: number;
        //
        // };
        // sub: string;
        // scope: string;
        access_token: string;
        refresh_token: string;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        refreshTokenExpires?: number;
        accessTokenExpires: number;
        refreshToken?: string;
        token: string;
        exp?: number;
        iat?: number;
        jti?: string;
    }
}

export default NextAuth(authOption);