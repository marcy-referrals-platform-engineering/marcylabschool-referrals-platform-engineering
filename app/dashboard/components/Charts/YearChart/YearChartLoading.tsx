import React from 'react';

function YearChartLoading() {
  return (
    <div className="col-span-12 h-[28.8rem] rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="animate-pulse flex flex-col h-full">
        {/* Title skeleton */}
        <div className="h-4 w-32 bg-gray-300 rounded mb-3 "></div>
        
        {/* Subtitle skeleton */}
        <div className="h-3 w-24 bg-gray-300 rounded mb-5 "></div>
        
        {/* Chart skeleton */}
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-12 gap-1 h-full">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="col-span-1 h-full flex flex-col justify-end">
                {/* Y-axis line skeleton */}
                <div className="w-full bg-gray-300h-[40%] rounded-t-md"></div>
                <div className="w-full bg-gray-200  h-[10%] rounded-t-md"></div>
                <div className="w-full bg-gray-300 h-[20%] rounded-t-md"></div>
                <div className="w-full bg-gray-200  h-[30%] rounded-t-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YearChartLoading;