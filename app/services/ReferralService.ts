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

}