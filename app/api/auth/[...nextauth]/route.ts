import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
    ],

    pages: {
        error: '/auth/error'
    },

    callbacks: {
        async signIn({user, account, profile}) {
            const isAuthorizedEmail = await prisma.authorizedEmails.findUnique({
                where: {email: user.email!}
            })

            if (!isAuthorizedEmail) return false
            return true
        }
    }
})

export { handler as GET, handler as POST}