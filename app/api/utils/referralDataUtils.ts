export const pointsMap = {
    hasToured: 20,
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



// Function to calculate weekly aggregated data
export function aggregateWeeklyData(referrals: any[]): {
    thisWeek: { day: string, points: number, referrals: number }[],
    lastWeek: { day: string, points: number, referrals: number }[]
} {
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
    const thisWeekData = Array.from({ length: 7 }, (_, index) => ({
        day: dayNames[index],
        points: 0,
        referrals: 0,
    }));
    const lastWeekData = Array.from({ length: 7 }, (_, index) => ({
        day: dayNames[index],
        points: 0,
        referrals: 0,
    }));

    const now = new Date();
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - now.getDay());

    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);

    referrals.forEach(referral => {
        // Always add 10 base points on the dateCreated day
        const referralDate = new Date(referral.dateCreated);
        const referralDayOfWeek = referralDate.getDay();

        if (referralDate >= startOfThisWeek && referralDate < now) {
            thisWeekData[referralDayOfWeek].points += 10;
            thisWeekData[referralDayOfWeek].referrals += 1;
        } else if (referralDate >= startOfLastWeek && referralDate < startOfThisWeek) {
            lastWeekData[referralDayOfWeek].points += 10;
            lastWeekData[referralDayOfWeek].referrals += 1;
        }

        // Process milestones based on their respective dates
        [
            { date: referral.hasToured, points: pointsMap.hasToured },
            { date: referral.hasApplied, points: pointsMap.hasApplied },
            { date: referral.hasBeenAccepted, points: pointsMap.hasBeenAccepted },
            { date: referral.hasEnrolled, points: pointsMap.hasEnrolled },
        ].forEach(milestone => {
            if (milestone.date) {
                const milestoneDate = new Date(milestone.date);
                const milestoneDayOfWeek = milestoneDate.getDay();

                if (milestoneDate >= startOfThisWeek && milestoneDate < now) {
                    thisWeekData[milestoneDayOfWeek].points += milestone.points;
                } else if (milestoneDate >= startOfLastWeek && milestoneDate < startOfThisWeek) {
                    lastWeekData[milestoneDayOfWeek].points += milestone.points;
                }
            }
        });
    });

    return {
        thisWeek: thisWeekData,
        lastWeek: lastWeekData,
    };
}

// Function to calculate monthly aggregated data
export function aggregateMonthlyData(referrals: any[]): { points: number, referrals: number }[] {
    const monthlyData = Array.from({ length: 12 }, () => ({ points: 0, referrals: 0 }));

    referrals.forEach(referral => {
        const referralDate = new Date(referral.dateCreated);
        const month = referralDate.getMonth();
        monthlyData[month].points += 10; // Base points for referral creation
        monthlyData[month].referrals += 1;

        // Process milestones based on their dates
        [
            { date: referral.hasToured, points: pointsMap.hasToured },
            { date: referral.hasApplied, points: pointsMap.hasApplied },
            { date: referral.hasBeenAccepted, points: pointsMap.hasBeenAccepted },
            { date: referral.hasEnrolled, points: pointsMap.hasEnrolled },
        ].forEach(milestone => {
            if (milestone.date) {
                const milestoneDate = new Date(milestone.date);
                const milestoneMonth = milestoneDate.getMonth();
                monthlyData[milestoneMonth].points += milestone.points;
            }
        });
    });

    return monthlyData;
}

export function calculateTotals(referrals: any[]): { totalPoints: number, totalReferrals: number } {
    let totalPoints = 0;
    let totalReferrals = referrals.length;

    referrals.forEach(referral => {
        totalPoints += calculateReferralPoints(referral);
    });

    return { totalPoints, totalReferrals };
}