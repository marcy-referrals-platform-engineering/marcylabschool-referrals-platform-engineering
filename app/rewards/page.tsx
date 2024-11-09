import React from 'react';

const RewardSection = ({ points = 50 }: { points: any }) => {
  const maxPoints = 500;
  const tiers = [
    { points: 70, imageUrl: 'https://via.placeholder.com/100', label: 'Gift Box' },
    { points: 150, imageUrl: 'https://via.placeholder.com/100', label: 'Medal' },
    { points: 250, imageUrl: 'https://via.placeholder.com/100', label: 'Trophy' },
    { points: 500, imageUrl: 'https://via.placeholder.com/100', label: 'Special Badge' },
  ];

  return (
    <div className="p-8 border border-gray-200 rounded-lg max-w-full mx-auto overflow-x-auto bg-white shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Rewards Progress</h2>
      <div className="relative h-36 mb-12 min-w-[800px]">
        {/* Progress Bar */}
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 h-4 bg-gray-300 rounded-full">
          {/* Progress Bar Fill */}
          <div
            className="h-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
            style={{ width: `${Math.min((points / maxPoints) * 100, 100)}%` }}
          ></div>
        </div>
        {tiers.map((tier, index) => {
          // Evenly space milestones along the progress bar (0% to 100%)
          const leftPosition = (index / (tiers.length - 1)) * 100;

          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${leftPosition}%`,
                top: '50%',
                transform: 'translate(-50%, -100%)',
              }}
            >
              {/* Milestone Icon */}
              <div className="relative">
                <img
                  src={tier.imageUrl}
                  alt={tier.label}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full shadow-md transition-transform ${
                    points >= tier.points ? 'border-4 border-green-500 transform scale-105' : 'opacity-50'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-center text-xl font-medium">Points: {points}</p>
    </div>
  );
};

export default RewardSection;


