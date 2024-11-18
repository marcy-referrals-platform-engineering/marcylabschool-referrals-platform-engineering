import React from "react";

interface RewardMilestoneProps {
  leftPosition: number;
  isReached: boolean;
  isSpecial: boolean;
  size: string;
  imageUrl: string;
  label: string;
  description: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHovered: boolean;
}

const RewardMilestone: React.FC<RewardMilestoneProps> = ({
  leftPosition,
  isReached,
  isSpecial,
  size,
  imageUrl,
  label,
  description,
  onMouseEnter,
  onMouseLeave,
  isHovered,
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
        left: `${leftPosition}%`,
        top: "50%",
        transform: `translate(-50%, -100%)`,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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

        <div className="flex items-center h-[2rem]">
          <div className="border-l-2 h-full mx-auto"></div>
        </div>

        {/* Popup for milestone */}
        {isHovered && (
          <div
            className="absolute top-[10rem] left-1/2 transform -translate-x-1/2 w-56 bg-white p-2 rounded shadow-lg border border-gray-200 text-center z-50"
            style={{ pointerEvents: "none" }}
          >
            <p className="font-bold">{label}</p>
            <p className="text-sm">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardMilestone;
