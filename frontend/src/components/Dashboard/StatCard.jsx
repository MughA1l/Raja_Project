import React from "react";

const StatCard = ({ icon: Icon, title, value, subtitle, color, bgColor }) => {
  return (
    <div className="bg-white rounded-2xl border border-black/6 p-3 md:p-5 flex items-start gap-3 md:gap-4 hover:shadow-md transition-shadow duration-200">
      <div
        className={`p-2 md:p-3 rounded-xl ${bgColor}`}
      >
        <Icon size={20} className={`md:w-6 md:h-6 ${color}`} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xl md:text-2xl font-bold text-dark-blue">{value}</span>
        <span className="text-xs md:text-sm font-medium text-dark-blue/80 truncate">{title}</span>
        {subtitle && (
          <span className="text-[10px] md:text-xs text-black/50 mt-1">{subtitle}</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
