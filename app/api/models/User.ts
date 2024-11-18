import prisma from "../../../prisma/client";
import { aggregateMonthlyData, aggregateWeeklyData, calculateTotals } from "../utils/referralDataUtils";
export default class User {

    static async search(query: string) { 
        const response = await prisma.authorizedEmails.findMany({
            where: {
                OR: [
                    { email: { contains: query, mode: 'insensitive' } },
                    { name: { contains: query, mode: 'insensitive' } }
                ]
               
            }
        });
        if (!response) {
            console.log("Failed to search users");
            return [];
        }
        return response;
    }

   static async getUserRole(email: string) {
        try {
            const userRole = await prisma.authorizedEmails.findFirst({
                where: { email },
                select: { role: true }
            })
            return userRole;
        } catch (error) {
            console.error("Error fetching user role:", error);
            throw new Error("Could not retrieve user role");
        }
   }

    static async requestEmailAuthorization(data: { email: string, name: string, img: string }) {
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



    static async getReferralStats(email: string, fetchForAll: boolean = true) {
        try {
            const userRole = await prisma.authorizedEmails.findFirst({
                where: { email },
                select: { role: true }
            })

            let userReferrals;

            userReferrals = (userRole as any).role === 'ADMIN' && fetchForAll
            ? await prisma.referral.findMany({
                take: 1000 // Increase this limit as needed
              })
            : await prisma.referral.findMany({
                where: { referrerEmail: email },
                take: 1000 // Add `take` here as well if needed
              });

            console.log(userReferrals.length, 'User has this many referrals');


            const monthlyData = aggregateMonthlyData(userReferrals);
            const weeklyData = aggregateWeeklyData(userReferrals);


            const { totalPoints, totalReferrals } = calculateTotals(userReferrals);

            return { monthlyData, weeklyData, totalPoints, totalReferrals };
        } catch (error) {
            console.error("Error fetching referral stats:", error);
            throw new Error("Could not retrieve referral statistics for the user");
        }
    }

}