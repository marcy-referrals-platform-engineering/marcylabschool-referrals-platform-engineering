"use client";
import React, { useRef, useState, useEffect } from "react";
import { useStore } from "@/app/state/useStore";
import ReferralService from "@/app/services/ReferralService";
import Header from "../components/layout/Header";

const RewardProgress: React.FC = () => {
  const [points, setPoints] = useState<number>(0);
  const { user } = useStore();
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  // Redemption date
  const redemptionDate = new Date("2024-05-03");

  useEffect(() => {
    if (!user) return;
    ReferralService.getReferralStats(user!.email).then((data) => {
      setPoints(100); // Set mock points for demonstration
    });
  }, [user]);

  // Default points for demonstration
  const maxPoints = 570;
  const tiers = [
    {
      points: 70,
      imageUrl: "https://via.placeholder.com/100",
      label: "Gift Box (70 points)",
      description: "Unlock a special gift box with rewards!",
    },
    {
      points: 150,
      imageUrl: "https://via.placeholder.com/100",
      label: "Medal (150 points)",
      description: "Receive a medal for your outstanding progress.",
    },
    {
      points: 250,
      imageUrl: "https://via.placeholder.com/100",
      label: "Trophy (250 points)",
      description: "Achieve this trophy for reaching a major milestone.",
    },
    {
      points: 500,
      imageUrl: "https://via.placeholder.com/100",
      label: "Special Badge (500 points)",
      description: "Earn the special badge for top-level referrers.",
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
    const walk = (x - startX) * 2;
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
    const walk = (x - startX) * 2;
    progressRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div>
      <Header />
      <div className="p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Referral Rewards Progress
        </h1>

        {/* Explanation Section */}
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

        {/* Progress Bar Section */}
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
          <div className="relative h-[30rem] mb-8 min-w-[1300px] md:min-w-[3300px]">
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
                  onMouseEnter={() => setHoveredTier(index)}
                  onMouseLeave={() => setHoveredTier(null)}
                >
                  {/* Reward Icon */}
                  <div className="relative">
                    <img
                      src={tier.imageUrl}
                      alt={tier.label}
                      className={`lg:w-[8rem] rounded-full shadow-md transition-transform ${
                        isReached
                          ? "border-4 border-blue-500 transform scale-110"
                          : "opacity-50"
                      }`}
                    />
                    {/* Lock overlay */}
                    {!isReached && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Inline SVG Lock Icon */}
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
                    {hoveredTier === index && (
                      <div
                        className="absolute top-[10rem] left-1/2 transform -translate-x-1/2 w-48 bg-white p-2 rounded shadow-lg border border-gray-200 text-center z-50"
                        style={{ pointerEvents: "none" }}
                      >
                        <p className="font-bold">{tier.label}</p>
                        <p className="text-sm">{tier.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-center text-lg font-medium">Points: {points}</p>
      </div>
    </div>
  );
};

export default RewardProgress;
