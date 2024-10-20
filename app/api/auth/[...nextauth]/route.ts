import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from '../../../../prisma/index';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async signIn({ user }) {
            // Check if the user is authorized
            const isAuthorizedEmail = await prisma.authorizedEmails.findUnique({
                where: { email: user.email! }
            });

            if (!isAuthorizedEmail) {
                const hasRequestedAuthorization = await prisma.authorizationRequests?.findUnique({
                    where: { email: user.email! }
                });

                return `/auth/error?email=${encodeURIComponent(user.email!)}&name=${encodeURIComponent(user.name!)}&img=${encodeURIComponent(user.image!)}&hasrequested=${hasRequestedAuthorization ? true : false}`;
            }

            // Add role to the user object
            if (isAuthorizedEmail) {
                user.role = isAuthorizedEmail.role;  // Attach role to user object
            }

            return true; // Allow sign-in if the email is authorized
        },

        async session({ session, token }: any) {
            // Attach the role to the session user object
            if (token?.role) {
                session.user.role = token.role;  // Use token.role to persist role
            }
            return session;
        },

        async jwt({ token, user }) {
            // If it's the first time (sign-in), copy the user's role to the token
            if (user) {
                token.role = user.role;  // Add role to token for persistence
            }
            return token;
        },
    },
});

export { handler as GET, handler as POST };