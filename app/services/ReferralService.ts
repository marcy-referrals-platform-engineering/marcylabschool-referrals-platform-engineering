import { apiFetch } from "../utils/globalUtils";

export default class ReferralService {

    static async sendReferralRequest(data: any): Promise<boolean> {
        const wasRequestSuccessful = !!(await apiFetch('api/referral/submit', 'POST', data));
        if (!wasRequestSuccessful) {
            console.log("Request failed")
        }
        return wasRequestSuccessful
    }

    static async getReferralStats(email: string): Promise<any> {
        const response = await apiFetch(`api/user/referral-stats?email=${email}`);
        if (!response) {
            console.log("Failed to fetch referral stats")
            return null;
        }
        return response;    
    }

    static async fetchReferrals(email: string): Promise<any> {
        try {
            const response = await fetch(`/api/referral/get-all?email=${email}`);
            if (!response.ok) {
                console.log("Failed to fetch referrals");
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching referrals:", error);
            return null;
        }
    }

}