import React from "react";
const ClassCard = ({ standard, onClick }) => {
  return (
      <div
      onClick={onClick}
      className="bg-gradient-to-br bg-gray-300 hover:scale-105 transition-transform duration-200 shadow-lg rounded-[10px] w-32 h-12 flex items-center justify-center cursor-pointer"
    >
      <h2 className="text-gray-500 text-[24px] font-bold">{standard}</h2>
    </div>
  );
};

export default ClassCard;
