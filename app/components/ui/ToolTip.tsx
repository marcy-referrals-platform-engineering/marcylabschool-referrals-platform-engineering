"use client";
import React, { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  tooltipText: string;
}
const Tooltip: React.FC<TooltipProps> = ({ children, tooltipText }) => {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle mouse movement and set tooltip position
  const handleMouseMove = (e: any) => {
    setTooltipPosition({
      x: e.clientX + 15, // Offset the tooltip for better visibility
      y: e.clientY + 15,
    });
  };

  // Show tooltip on hover and set event listener for mouse movement
  const handleMouseEnter = (e: any) => {
    setIsVisible(true);
    handleMouseMove(e);
  };

  // Hide tooltip on mouse leave
  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className=""
    >
      {children}
      {isVisible && (
        <div
          style={{
            top: tooltipPosition.y,
            left: tooltipPosition.x,
          }}
          className="fixed bg-gray-700 text-white text-sm px-2 py-1 rounded shadow-lg z-50 pointer-events-none transition-opacity duration-200"
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
