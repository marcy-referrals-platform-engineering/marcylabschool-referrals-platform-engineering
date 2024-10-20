// import { prisma } from '../../../prisma/index'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default class User {

    static async requestEmailAuthorization(data: { email: string, name: string, img: string }) {
        console.log('Request data raw:', data);
         const request = await prisma.authorizationRequests.create({
            data: {
                email: data.email,
                name: data.name,
                img: data.img
            }
        })
        if (!request) {
            throw new Error('Failed to  try to create authorization request');
        }
        return request;
    }
    
}