import { prisma } from '../../../prisma/index'

export default class User {
    static async requestEmailAuthorization(email: string, name: string, img: string) {
        prisma.authorizationRequests.create({
            data: {
                email: email,
                name: name,
                img: img
            }
        })
    }
    
}