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

    static async fetchReferrals(email: string, page: number = 1, pageSize: number = 5): Promise<any> {
        const response = await fetch(`/api/referral/get-all?email=${email}&page=${page}&pageSize=${pageSize}`);
    if (!response.ok) {
        throw new Error('Failed to fetch referrals');
    }
    return await response.json();
    }

    static async updateReferralStatus(referralId: number, milestone: string): Promise<any> {
        try {
            console.log('Frontend referral id', referralId)
            const response = await apiFetch('/api/referral/update-status', 'PATCH', { referralId, milestone });
            if (!response.ok) {
                console.log('Failed to update referral status');
                return null;
            }
        } catch (error) {
            console.error("Error updated referral status, error");
            return null
        }

    }

    static async updateReviewStatus(referralId: number): Promise<any> {
        try {
            const response = await apiFetch('/api/referral/update-review-status', 'PATCH', { referralId });
            if (!response.ok) {
                console.log('Failed to update review status');
                return null;
            }
        } catch (error) {
            console.error("Error updating review status:", error);
            return null;
        }
    }

}