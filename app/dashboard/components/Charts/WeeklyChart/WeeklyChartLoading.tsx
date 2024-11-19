
function WeeklyChartLoading() {
  return (
    <div className="h-[27.2rem] col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="animate-pulse flex flex-col h-full">
        {/* Title Skeleton */}
        <div className="h-4 w-36 bg-gray-300 rounded mb-3 dark:bg-gray-600"></div>
        
        {/* Subtitle Skeleton */}
        <div className="h-3 w-24 bg-gray-300 rounded mb-6 dark:bg-gray-600"></div>
        
        {/* Legend Skeleton */}
        <div className="flex space-x-4 mb-6">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-gray-400 rounded-full mr-2 dark:bg-gray-500"></div>
            <div className="h-3 w-12 bg-gray-300 rounded dark:bg-gray-600"></div>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-gray-400 rounded-full mr-2 dark:bg-gray-500"></div>
            <div className="h-3 w-16 bg-gray-300 rounded dark:bg-gray-600"></div>
          </div>
        </div>
        
        {/* Bar Chart Skeleton */}
        <div className="flex justify-between items-end h-full">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="flex flex-col items-center space-y-1 w-6">
              {/* "Referrals" Section (lighter top part) */}
              <div className="w-full bg-gray-200 h-[20%] rounded-t"></div>
              {/* "Points" Section (darker bottom part) */}
              <div className="w-full bg-gray-500 h-[50%] rounded-t"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeeklyChartLoading;