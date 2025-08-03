

import React from "react";
import { useNavigate } from "react-router-dom";
import StandardCard from "../Components/StandardCards";

const Dashboard = () => {
  const navigate = useNavigate();

  const standardSections = {
 
    "10th": ["A", "B", "C", "D"],
    "11th": ["A", "B"],
    "12th": ["A", "B", "C"],
  };

  const standards = Object.keys(standardSections);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight drop-shadow">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-sm mt-1">Manage standards and sections efficiently</p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-2xl shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Logout
        </button>
      </header>

      {/* Standard Grid */}
      <section className="bg-white bg-opacity-50 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Select a Standard
        </h2>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {standards.map((std) => (
            <div
              key={std}
              className="transform transition-transform duration-300 hover:scale-105"
            >
              <StandardCard
                standard={std}
                onClick={() => navigate(`/standard/${std}`)}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
