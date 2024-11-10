"use client";
import React, { useRef, useState, useEffect } from "react";
import { useStore } from "@/app/state/useStore";
import ReferralService from "@/app/services/ReferralService";
const RewardProgress: React.FC = () => {
const [points, setPoints] = useState<number>(0)
  const { user } = useStore();
  useEffect(() => {
    if (!user) return;
    ReferralService.getReferralStats(user!.email).then((data) => {setPoints(data.totalPoints)});
  });
   // Default points for demonstration
  const maxPoints = 520;
  const tiers = [
    {
      points: 70,
      imageUrl: "https://via.placeholder.com/100",
      label: "Gift Box",
    },
    {
      points: 150,
      imageUrl: "https://via.placeholder.com/100",
      label: "Medal",
    },
    {
      points: 250,
      imageUrl: "https://via.placeholder.com/100",
      label: "Trophy",
    },
    {
      points: 500,
      imageUrl: "https://via.placeholder.com/100",
      label: "Special Badge",
    },
  ];

  const progressRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (progressRef.current?.offsetLeft || 0));
    setScrollLeft(progressRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !progressRef.current) return;
    e.preventDefault();
    const x = e.pageX - (progressRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2; // Adjust the drag speed
    progressRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (progressRef.current?.offsetLeft || 0));
    setScrollLeft(progressRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !progressRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - (progressRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2; // Adjust the drag speed
    progressRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="p-6  bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Referral Rewards Progress
      </h2>
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        ref={progressRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-[25rem] mb-8  min-w-[1200px] md:min-w-[3300px]">
          {/* Progress Bar */}
          <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 h-4 bg-gray-200 rounded-full">
            {/* Progress Bar Fill */}
            <div
              className="h-4 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${(points / maxPoints) * 100}%` }}
            ></div>
          </div>

          {/* Milestones */}
          {tiers.map((tier, index) => {
            // Calculate the left position as a percentage based on the tier's points
            const leftPosition = (tier.points / maxPoints) * 100;
            const isReached = points >= tier.points;

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${leftPosition}%`,
                  top: "50%",
                  transform: `translate(-50%, -100%)`,
                }}
              >
                {/* Reward Icon */}
                <div className="relative">
                  <img
                    src={tier.imageUrl}
                    alt={tier.label}
                    className={`lg:w-[8rem]  rounded-full shadow-md transition-transform ${
                      isReached
                        ? "border-4 border-blue-500 transform scale-110"
                        : "opacity-50"
                    }`}
                  />
                  <div className="flex items-center h-[2rem]">
                    <div className="border-l-2 h-full mx-auto"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-center text-lg font-medium">Points: {points}</p>
    </div>
  );
};

export default RewardProgress;
