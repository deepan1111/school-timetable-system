import React from "react";
import { useNavigate } from "react-router-dom";
import StandardCard from "../Components/StandardCards"; // Your existing card component

const Dashboard = () => {
  const navigate = useNavigate();

  const standardSections = {
    "5th": ["A", "B"],
    "6th": ["A", "B", "C"],
    "7th": ["A", "B"],
    "8th": ["A", "B", "C", "D"],
    "9th": ["A", "B", "C"],
    "10th": ["A", "B", "C", "D"],
    "11th": ["A", "B"],
    "12th": ["A", "B", "C"],
  };

  const standards = Object.keys(standardSections);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <button onClick={()=> navigate("/")}
          className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Standards Grid */}
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {standards.map((std) => (
          <StandardCard
            key={std}
            standard={std}
            onClick={() => navigate(`/standard/${std}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
