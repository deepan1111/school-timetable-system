import React from "react";
const ClassCard = ({ standard, onClick }) => {
  return (
      <div
      onClick={onClick}
      className="bg-gradient-to-br from-indigo-500 to-violet-600 hover:scale-105 transition-transform duration-200 shadow-lg rounded-2xl w-32 h-32 flex items-center justify-center cursor-pointer"
    >
      <h2 className="text-white text-2xl font-bold">{standard}</h2>
    </div>
  );
};

export default ClassCard;
