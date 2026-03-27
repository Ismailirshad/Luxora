import React from "react";

const AnalyticsTabSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-6 shadow-lg relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="h-4 w-24 bg-gray-700 rounded"></div>
              <div className="h-8 w-32 bg-gray-700 rounded"></div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gray-700 rounded-full opacity-40"></div>
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="bg-gray-800/60 rounded-lg p-6 shadow-lg">
        <div className="h-6 w-40 bg-gray-700 rounded mb-6"></div>

        <div className="h-[400px] flex items-end justify-between gap-3">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="flex-1 bg-gray-700 rounded-t"
              style={{ height: `${Math.floor(Math.random() * 250) + 80}px` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTabSkeleton;