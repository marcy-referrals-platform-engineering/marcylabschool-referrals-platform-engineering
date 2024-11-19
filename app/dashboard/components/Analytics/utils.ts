export interface UserStats {
    weeklyData: {
      thisWeek: { points: number; referrals: number }[];
    };
    totalPoints: number;
    totalReferrals: number;
  }
  
  export const calculateWeeklyPercentIncrease = (userStats: UserStats | null) => {
    if (!userStats) return { points: 0, referrals: 0 };
  
    const { thisWeek } = userStats.weeklyData;
    const totalPoints = userStats.totalPoints;
    const totalReferrals = userStats.totalReferrals;
  
    const pointsThisWeek = thisWeek.reduce((total, day) => total + day.points, 0);
    const referralsThisWeek = thisWeek.reduce((total, day) => total + day.referrals, 0);
  
    const previousTotalPoints = totalPoints - pointsThisWeek;
    const previousTotalReferrals = totalReferrals - referralsThisWeek;
  
    const pointsIncreasePercentage =
      previousTotalPoints > 0 ? Math.round((pointsThisWeek / previousTotalPoints) * 100) : 100;
  
    const referralsIncreasePercentage =
      previousTotalReferrals > 0 ? Math.round((referralsThisWeek / previousTotalReferrals) * 100) : 100;
  
    return {
      points: pointsIncreasePercentage,
      referrals: referralsIncreasePercentage,
    };
  };
  
export const generateSWRKey = (userEmail: string | null, selectedUserEmail: string | null) => {
    if (selectedUserEmail) {
      return `referral-stats-${selectedUserEmail}&fetchForAll=false`;
    }
    return userEmail ? `referral-stats-${userEmail}` : null;
  };