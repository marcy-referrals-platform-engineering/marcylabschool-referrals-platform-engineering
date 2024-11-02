import prisma from '../../../prisma/client'
export default class Referral {
    static async create(data: any) {
        console.log(Object.keys(prisma))
        const referral = await prisma.referral.create({
            data: {
                name: data.recruitName,
                email: data.recruitEmail,
                resume: data.recruitResume || null,
                gender: data.recruitGender || null,
                linkedIn: data.recruitLinkedIn || null,
                referrerEmail: data.email,
            }
        })

        if (!referral) {
            throw new Error('Failed to create referral');
        }
        return referral;
    }

    static async fetchAll(email: string) {
        const referrals = await prisma.referral.findMany({
            where: {
                referrerEmail: email,
            },
        });

        if (!referrals) {
            throw new Error('Failed to fetch referrals');
        }
        return referrals;

    }
}