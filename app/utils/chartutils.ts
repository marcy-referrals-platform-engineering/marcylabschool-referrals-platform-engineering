
export interface ChartData {
    series: {
      name: string;
      data: number[];
    }[];
    categories: string[];
  }

export function formatLineChartData(monthlyData: { points: number, referrals: number }[]) {
    return {
        series: [
            {
                name: "Total Points",
                data: monthlyData.map(item => item.points),
            },
            {
                name: "Total Referrals",
                data: monthlyData.map(item => item.referrals),
            },
        ],
        categories: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    };
}

export function formatBarChartData(weeklyData: { day: string, points: number, referrals: number }[]) {
   
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    return {
        series: [
            {
                name: "Points",
                data: weeklyData.map(item => item.points),
            },
            {
                name: "Referrals",
                data: weeklyData.map(item => item.referrals),
            },
        ],
        // Map each day's index in `weeklyData` to its respective abbreviation
        categories: weeklyData.map((_, index) => dayNames[index]),
    };
}