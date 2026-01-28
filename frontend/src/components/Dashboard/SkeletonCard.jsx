import React from "react";

export const StatCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-black/6 p-5 flex items-start gap-4 animate-pulse">
    <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
    <div className="flex flex-col gap-2">
      <div className="w-16 h-6 bg-gray-200 rounded"></div>
      <div className="w-24 h-4 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export const ProgressCardSkeleton = () => (
  <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl p-6 col-span-2 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-col gap-2">
        <div className="w-32 h-5 bg-white/30 rounded"></div>
        <div className="w-48 h-4 bg-white/20 rounded"></div>
      </div>
      <div className="w-12 h-12 bg-white/20 rounded-xl"></div>
    </div>
    <div className="w-full h-3 bg-white/20 rounded-full mb-4"></div>
    <div className="grid grid-cols-3 gap-4 mt-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="w-12 h-6 bg-white/30 rounded"></div>
          <div className="w-16 h-3 bg-white/20 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

export const RecentCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-black/6 p-3 flex gap-3 animate-pulse">
    <div className="h-20 w-20 min-w-20 bg-gray-200 rounded-xl"></div>
    <div className="flex flex-col justify-center flex-1 gap-2">
      <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
      <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
      <div className="w-1/3 h-3 bg-gray-200 rounded"></div>
    </div>
    <div className="w-16 h-5 bg-gray-200 rounded-lg"></div>
  </div>
);
