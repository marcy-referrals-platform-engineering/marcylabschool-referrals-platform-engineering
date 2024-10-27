import { apiFetch } from "../utils/globalUtils";

export default class ReferralService {

    static async sendReferralRequest(data: any): Promise<boolean> {
        const wasRequestSuccessful = !!(await apiFetch('api/referral/submit', 'POST', data));
        if (!wasRequestSuccessful) {
            console.log("Request failed")
        }
        return wasRequestSuccessful
    }

}