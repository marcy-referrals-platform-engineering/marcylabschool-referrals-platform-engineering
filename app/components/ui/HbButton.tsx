import { useState } from "react";

export default function HbButton({
  isActive,
  setIsActive,
  direction,
  className,
}: {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  direction: string;
  className?: string;
}) {
  return (
    <div
      className={` cursor-pointer ${
        direction === "down" ? "" : "rotate-[180deg] "
       }`}
      onClick={() => setIsActive(!isActive)}
    >
      <h1 className={`text-[2rem] text-center rounded-full   bg-[white] mt-2 bg-opacity-50 border-[3px] border-[#261f1d] w-[3.3rem] h-[3.3rem] ${className}`}>
        ↓
      </h1>
    </div>
  );
}
