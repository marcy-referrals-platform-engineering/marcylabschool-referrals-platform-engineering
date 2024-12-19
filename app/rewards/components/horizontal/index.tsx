"use client";
import React, { useRef, useState, useEffect } from "react";
import { useStore } from "@/app/state/useStore";
import ReferralService from "@/app/services/ReferralService";
import { tiers, maxPoints, redemptionDate } from "../../data";
import { useDraggable } from "../../hooks";
import RewardMilestone from "./RewardMilestoneHorizontal";

const RewardProgress: React.FC<{ points: any, user: any}> = ({points, user}) => {

  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  // Ref for progress bar container
  const progressRef = useRef<HTMLDivElement>(null);

  const { handleMouseDown, handleMouseMove } = useDraggable(progressRef);



  return (
    <div>
      <div className="p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Referral Rewards Progress
        </h1>

        {/* Introductory text */}
        <div className="mb-6 text-center">
         
       
          <p className="text-md ">
           Note: Only current fellows and alumni can redeem rewards at this time.
          </p>
          <p className="text-md mt-2">
            You can redeem your rewards starting from{" "}
            <span className="font-semibold">
              {redemptionDate.toLocaleDateString()}
            </span>
            .
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Keep referring to reach the next milestone and unlock more rewards.
          </p>
        </div>

        {/* Progress bar container with drag functionality */}
        <div
          className="overflow-y-hidden overflow-x-scroll cursor-grab active:cursor-grabbing"
          ref={progressRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        >
          <div className="relative h-[30rem] mb-8 min-w-[1300px] md:min-w-[3300px]">
            {/* Background of the progress bar */}
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 h-4 bg-gray-200 rounded-full">
              {/* Filled part of the progress bar */}
              <div
                className="h-4 bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${(points / maxPoints) * 100}%` }}
              ></div>
            </div>

            {/* Render each milestone as a separate component */}
            {tiers.map((tier: any, index: any) => (
              <RewardMilestone
                key={index}
                leftPosition={(tier.points / maxPoints) * 100} // Position milestone based on points
                isReached={points >= tier.points} // Highlight milestone if reached
                isSpecial={tier.special || false} // Determine if milestone is special
                size={
                  tier.special ? "w-[10rem] h-[10rem]" : "w-[8rem] h-[8rem]"
                } // Size varies for special milestones
                imageUrl={tier.imageUrl} // Image for milestone
                label={tier.label} // Label for milestone
                description={tier.description} // Description shown on hover
                onMouseEnter={() => setHoveredTier(index)} // Handle hover state
                onMouseLeave={() => setHoveredTier(null)} // Reset hover state
                isHovered={hoveredTier === index} // Check if milestone is currently hovered
              />
            ))}
          </div>
        </div>

        {/* Display current points for the user */}
        {user && user.role === "USER" && (
          <p className="text-center text-lg font-medium">Points: {points}</p>
        )}
      </div>
    </div>
  );
};

export default RewardProgress;
