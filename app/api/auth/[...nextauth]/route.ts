import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {prisma} from '../../../../prisma/index'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
    ],

    callbacks: {
        async signIn({user, account, profile}) {
            const isAuthorizedEmail = await prisma.authorizedEmails.findUnique({
                where: {email: user.email!}
            })

            if (!isAuthorizedEmail) return `/auth/error?email=${encodeURIComponent(user.email!)}`
            else return true
        }
    }
})

export { handler as GET, handler as POST}