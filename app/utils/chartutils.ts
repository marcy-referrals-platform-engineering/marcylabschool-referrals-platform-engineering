export function formatLineChartData(monthlyData: { points: number, referrals: number }[]) {
    return {
        labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [
            {
                label: "Total Points",
                data: monthlyData.map(item => item.points),
                borderColor: "blue",
                fill: true,
            },
            {
                label: "Total Referrals",
                data: monthlyData.map(item => item.referrals),
                borderColor: "lightblue",
                fill: true,
            },
        ],
    };
}


export function formatBarChartData(weeklyData: { day: string, points: number, referrals: number }[]) {
    return {
        labels: weeklyData.map(item => item.day),
        datasets: [
            {
                label: "Points",
                data: weeklyData.map(item => item.points),
                backgroundColor: "blue",
            },
            {
                label: "Referrals",
                data: weeklyData.map(item => item.referrals),
                backgroundColor: "lightblue",
            },
        ],
    };
}