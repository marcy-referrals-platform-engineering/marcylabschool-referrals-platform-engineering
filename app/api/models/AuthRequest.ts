import prisma from '../../../prisma/client'


export default class AuthRequest {
    static async getAll() {
        const authRequests = await prisma.authorizationRequests.findMany()

        if (!authRequests) {
            throw new Error('Error fetching auth requests')
        }
        return authRequests
    }

    static async handleRequest(requestId: number, shouldAccept: boolean) {
        const authRequest = await prisma.authorizationRequests.findUnique({
            where: { id: requestId },
        });

        if (!authRequest) throw new Error('Unable to get Authorization Request')

        const userEmail = authRequest.email

        const deletedReq = await prisma.authorizationRequests.delete({ where: { id: requestId } })

        if (!deletedReq) throw new Error('Error when trying to delete authorization request')

        if (shouldAccept) {
            const authorizedEmail = await prisma.authorizedEmails.create({
                data: {
                    email: userEmail
                }
            })
            if (!authorizedEmail) throw new Error('Error when trying to authorize email')
            return authorizedEmail
        }

        return true

    }


}