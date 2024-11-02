import { apiFetch } from "@/app/utils/globalUtils";



export const fetchReferralData = async (email: string) => {
  const referrals = await apiFetch(`api/referral/get-all?email=${email}`);
    if (!referrals) {
        console.log("Failed to fetch referrals")
        return null;
    }
    return referrals;
};