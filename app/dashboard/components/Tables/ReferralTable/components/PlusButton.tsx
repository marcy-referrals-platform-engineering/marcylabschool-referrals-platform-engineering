import React from "react";

const PlusButton = ({ onClick }: { onClick: any }) => {
  return (
    <button
      onClick={onClick}
      className="p-1 px-3 scale-[0.8] bg-[#261f1d] shadow-lg hover:opacity-50 duration-200 text-white rounded-full flex items-center justify-center"
      aria-label="Add"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
  );
};

export default PlusButton;