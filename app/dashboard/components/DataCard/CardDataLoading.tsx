import React from "react";

function CardDataLoading() {
  return (
        <div
          
          className="rounded-sm border border-stroke bg-white px-7.5 py-1  shadow-default animate-pulse"
        >
          <div className="scale-[80%] translate-x-[-2rem]">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>{" "}
              {/* Circle */}
              <div className="flex-1 h-6 rounded bg-gray-200"></div>{" "}
              {/* Small text */}
            </div>
            <div className="mt-4 h-8 w-16 rounded bg-gray-200"></div>{" "}
            {/* Large number */}
            <div className="mt-2 h-5 w-24 rounded bg-gray-200"></div>{" "}
            {/* Label text */}
            <div className="mt-4 h-5 w-16 rounded bg-gray-200"></div>{" "}
            {/* Percentage */}
          </div>
        </div>

  );
}

export default CardDataLoading;
