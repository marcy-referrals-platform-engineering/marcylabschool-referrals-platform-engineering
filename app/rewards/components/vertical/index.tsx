"use client";
import React, { useRef, useState, useEffect } from "react";
import { useStore } from "@/app/state/useStore";
import ReferralService from "@/app/services/ReferralService";
import { tiers, maxPoints, redemptionDate } from "../../data";
import { useDraggable } from "../../hooks";
import RewardMilestone from "./RewardMilestoneVertical";

const RewardProgress: React.FC<{ user: any; points: any }> = ({
  user,
  points,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);



  return (
    <div>
      {/* Display current points for the user */}
      {user && user.role === "USER" && (
        <p className=" fixed text-center bottom-50 pl-5 text-lg z-[1200] font-medium">
          Points: {points}
        </p>
      )}
      <div className="p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Referral Rewards Progress
        </h1>

        {/* Introductory text */}
        <div className="mb-6 text-center">
          <p className="text-lg">
            Earn points by referring friends and unlock exciting rewards!
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
          className="overflow-x-hidden   active:cursor-grabbing"
          ref={progressRef}
        >
          <div className="relative w-[8rem] mx-auto min-h-[3000px]">
            {/* Background of the progress bar */}
            <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-4 bg-gray-200 rounded-full">
              {/* Filled part of the progress bar */}
              <div
                className="w-4 bg-blue-500 rounded-full transition-all duration-300"
                style={{ height: `${(points / maxPoints) * 100}%` }}
              ></div>
            </div>

            {/* Render each milestone as a separate component */}
            {tiers.map((tier, index) => (
              <div
                className="absolute left-1/2 transform -translate-x-1/2"
                style={{ top: `${(tier.points / maxPoints) * 100}%` }}
              >
                <RewardMilestone
                  key={index}
                  topPosition={(tier.points / maxPoints) * 100} // Position milestone based on points
                  isReached={points >= tier.points} // Highlight milestone if reached
                  isSpecial={tier.special || false} // Determine if milestone is special
                  size={
                    tier.special ? "w-[10rem] h-[10rem]" : "w-[8rem] h-[8rem]"
                  } // Size varies for special milestones
                  imageUrl={tier.imageUrl} // Image for milestone
                  label={tier.label} // Label for milestone
                  description={tier.description} // Description shown on hover
                />
              </div> // Center milestone horizontally></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardProgress;
