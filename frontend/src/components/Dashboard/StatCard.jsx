import React from "react";

const StatCard = ({ icon: Icon, title, value, subtitle, color, bgColor }) => {
  return (
    <div className="bg-white rounded-2xl border border-black/6 p-5 flex items-start gap-4 hover:shadow-md transition-shadow duration-200">
      <div
        className={`p-3 rounded-xl ${bgColor}`}
      >
        <Icon size={24} className={color} />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-dark-blue">{value}</span>
        <span className="text-sm font-medium text-dark-blue/80">{title}</span>
        {subtitle && (
          <span className="text-xs text-black/50 mt-1">{subtitle}</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
