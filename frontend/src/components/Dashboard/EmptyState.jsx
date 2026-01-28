import React from "react";

const EmptyState = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="p-4 bg-gray-100 rounded-full mb-3">
        <Icon size={28} className="text-gray-400" />
      </div>
      <h4 className="font-medium text-dark-blue/80">{title}</h4>
      <p className="text-sm text-black/50 mt-1">{description}</p>
    </div>
  );
};

export default EmptyState;
