import 'next-auth';

declare module 'next-auth' {
    interface User {
        role?: string;
    }

    interface Session {
        user: {
            role?: string;
            name?: string;
            email?: string;
            image?: string;
        };
    }
}