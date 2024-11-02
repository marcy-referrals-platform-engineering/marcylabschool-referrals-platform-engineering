export const pointsMap = {
    hasToured: 10,
    hasApplied: 50,
    hasBeenAccepted: 100,
    hasEnrolled: 200,
};



export function calculateReferralPoints(referral: any): number {
    //  start at 10 because a referral automatically gets 10 points
    let points = 10;
    if (referral.hasToured) points += pointsMap.hasToured;
    if (referral.hasApplied) points += pointsMap.hasApplied;
    if (referral.hasBeenAccepted) points += pointsMap.hasBeenAccepted;
    if (referral.hasEnrolled) points += pointsMap.hasEnrolled;
    return points;
}

export function calculateTotals(referrals: any[]): { totalPoints: number, totalReferrals: number } {
    let totalPoints = 0;
    let totalReferrals = referrals.length;

    referrals.forEach(referral => {
        totalPoints += calculateReferralPoints(referral);
    });

    return { totalPoints, totalReferrals };
}

export function aggregateMonthlyData(referrals: any[]): { points: number, referrals: number }[] {
    const monthlyData = Array.from({ length: 12 }, () => ({ points: 0, referrals: 0 }));

    referrals.forEach(referral => {
        const month = referral.dateCreated.getMonth();
        const referralPoints = calculateReferralPoints(referral);
        monthlyData[month].points += referralPoints;
        monthlyData[month].referrals += 1;
    });

    return monthlyData;
}


export function aggregateWeeklyData(referrals: any[]): { day: string, points: number, referrals: number }[] {
    const weeklyData = Array.from({ length: 7 }, () => ({ day: '', points: 0, referrals: 0 }));
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

    weeklyData.forEach((data, index) => {
        data.day = dayNames[index];
    });

    referrals.forEach(referral => {
        const day = referral.dateCreated.getDay();
        const referralPoints = calculateReferralPoints(referral);
        weeklyData[day].points += referralPoints;
        weeklyData[day].referrals += 1;
    });

    return weeklyData;
}