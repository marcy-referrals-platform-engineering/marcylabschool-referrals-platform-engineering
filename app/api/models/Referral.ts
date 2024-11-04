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
                referrerName: data.name
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


    static async updateMilestoneStatus(referralId: number, milestone: string) {
        // First, retrieve the current value of the milestone field
        const referral = await prisma.referral.findUnique({
            where: { id: referralId },
            select: { [milestone]: true }
        });

        if (!referral) {
            throw new Error('Referral not found');
        }

        // Determine the new value based on the current value
        const newValue = referral[milestone] === null ? new Date() : null;

        // Update the milestone field based on the new value
        const updatedReferral = await prisma.referral.update({
            where: { id: referralId },
            data: { [milestone]: newValue }
        });

        if (!updatedReferral) {
            throw new Error('Error updating referral milestone in DB');
        }

        return updatedReferral;
    }

}