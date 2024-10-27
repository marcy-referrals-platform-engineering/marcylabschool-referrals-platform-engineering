import prisma from "../../../prisma/client";
export default class Referral {
    static async create(data: any) {
        const referral = await prisma.referral.create({
            data: {
                name: data.recruitName,
                email: data.recruitEmail,
                resume: data.recruitResume || null,
                gender: data.recruitGender || null,
                referrerEmail: data.r
            }
        })
    }
}