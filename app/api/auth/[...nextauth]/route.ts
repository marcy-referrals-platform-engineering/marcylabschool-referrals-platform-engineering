import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from '../../../../prisma/index'


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async signIn({ user }) {
            const isAuthorizedEmail = await prisma.authorizedEmails.findUnique({where: { email: user.email! }});

            if (!isAuthorizedEmail) {
                const hasRequestedAuthorization = await prisma.authorizationRequests?.findUnique({ where: { email: user.email! } }) ?? null
                return `/auth/error?email=${encodeURIComponent(user.email!)}&name=${encodeURIComponent(user.name!)}&hasrequested=${hasRequestedAuthorization ? true : false}`;
            } else {
                return true;
            }

        }
    }
})

export { handler as GET, handler as POST }