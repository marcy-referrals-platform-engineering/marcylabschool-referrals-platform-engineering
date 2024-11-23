import React from "react";

interface RewardMilestoneProps {
  topPosition: number; // Vertical positioning
  isReached: boolean;
  isSpecial: boolean;
  size: string;
  imageUrl: string;
  label: string;
  description: string;
}

const RewardMilestone: React.FC<RewardMilestoneProps> = ({
  topPosition,
  isReached,
  isSpecial,
  size,
  imageUrl,
  label,
  description,
}) => {
  const imageClassNames = `overflow-hidden ${size} rounded-full shadow-md transition-transform ${
    isReached ? "transform scale-110" : "opacity-50"
  } ${
    isSpecial
      ? isReached
        ? "border-4 border-yellow-500 animate-pulse"
        : "border-4 border-yellow-500 opacity-75"
      : isReached
      ? "border-4 border-blue-500"
      : ""
  }`;

  return (
    <div
      className="absolute"
      style={{
        top: `${topPosition}%`, // Use top for vertical positioning
        left: "50%", // Center horizontally
        transform: `translate(-50%, -50%)`, // Adjust to center the milestone
      }}
    >
      {/* Reward Icon */}
      <div className={`relative ${isSpecial ? "special-tier" : ""}`}>
        {isSpecial && (
          <div className="absolute top-[-1.5rem] left-1/3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-bl">
            Limited
          </div>
        )}
        <div className={imageClassNames}>
          <img src={imageUrl} alt={label} className={`object-fill m-auto ${size}`} />
        </div>

        {/* Lock overlay */}
        {!isReached && (
          <div className="absolute inset-0 bottom-[18%] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2v-9a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm3 8V6a3 3 0 10-6 0v3h6zM8 12a1 1 0 011-1h6a1 1 0 011 1v7H8v-7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        {/* Vertical connector */}
        <div className="flex  flex-col items-center h-[2rem]">
          {/* <div className="border-t-2 w-full mx-auto"></div> */}
        </div>

        {/* Always visible info box aligned to the left */}
        <div
          className={`absolute ${isSpecial? 'translate-x-[-1.1rem]' : 'translate-x-[-1.9rem]'}  transform -translate-y-[1.5rem] w-50 bg-white p-2 text-xs rounded shadow-lg border border-gray-200  z-50`}
        >
          <p className=" text-center font-bold">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default RewardMilestone;
