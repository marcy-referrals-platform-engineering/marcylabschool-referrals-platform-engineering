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

    static async fetchAll(email: string, page: number = 1, pageSize: number = 5, fetchForAll: boolean = true) {
        // Find the user to check their role
        const user = await prisma.authorizedEmails.findUnique({
            where: {
                email: email
            }
        });

        // Calculate the number of items to skip based on the current page and page size
        const skip = (page - 1) * pageSize;

        // Declare variables for referrals and total count
        let referrals, totalCount;

        // Fetch referrals based on the user's role
        if (user?.role === 'ADMIN' && fetchForAll) {
            referrals = await prisma.referral.findMany({
                skip: skip,
                take: pageSize,
                orderBy: {
                    dateCreated: 'desc' // Ensure this field exists in your schema
                }
            });
            if (!referrals.length) {
                console.log('failed mf')
            }
            // Fetch the total count for pagination
            totalCount = await prisma.referral.count();
        } else {
            referrals = await prisma.referral.findMany({
                where: {
                    referrerEmail: email,
                },
                skip: skip,
                take: pageSize,
                orderBy: {
                    dateCreated: 'desc'
                }
            });

            if (!referrals) {
                console.log('failed mf')
            }
            // Fetch the total count for the user
            totalCount = await prisma.referral.count({
                where: {
                    referrerEmail: email,
                }
            });
        }

        // Return referrals and pagination data
        return {
            data: referrals,
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / pageSize)
        };
    }


    static async searchReferrals(email: string, query: string, page: number = 1, pageSize: number = 5, fetchForAll: boolean = true) {
        const user = await prisma.authorizedEmails.findUnique({
            where: { email: email }
        });

        const skip = (page - 1) * pageSize;

        let referrals, totalCount;

        if (user?.role === 'ADMIN' && fetchForAll) {
            referrals = await prisma.referral.findMany({
                where: {
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        { email: { contains: query, mode: 'insensitive' } },
                        { referrerName: { contains: query, mode: 'insensitive' } },
                        { referrerEmail: { contains: query, mode: 'insensitive' } }
                    ]
                },
                skip: skip,
                take: pageSize,
                orderBy: { dateCreated: 'desc' }
            });
            totalCount = await prisma.referral.count({
                where: {
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        { email: { contains: query, mode: 'insensitive' } }
                    ]
                }
            });
        } else {
            referrals = await prisma.referral.findMany({
                where: {
                    referrerEmail: email,
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        { email: { contains: query, mode: 'insensitive' } }
                    ]
                },
                skip: skip,
                take: pageSize,
                orderBy: { dateCreated: 'desc' }
            });
            totalCount = await prisma.referral.count({
                where: {
                    referrerEmail: email,
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        { email: { contains: query, mode: 'insensitive' } }
                    ]
                }
            });
        }

        return {
            data: referrals,
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / pageSize)
        };
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

    static async updateReviewStatus(referralId: number) {
        console.log('Backend referral id', referralId)
        const referral = await prisma.referral.findUnique({
            where: { id: referralId },
            select: { reviewed: true }
        });

        if (!referral) {
            throw new Error('Referral not found');
        }

        const newValue = !referral.reviewed;

        const updatedReferral = await prisma.referral.update({
            where: { id: referralId },
            data: { reviewed: newValue }
        });

        if (!updatedReferral) {
            throw new Error('Error updating referral reviewed status in DB');
        }

        return updatedReferral;
    }
}