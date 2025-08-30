
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StandardCard from "../Components/StandardCards";
import TeacherCardWithPagination from "../Components/TeacherCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("timetable");

  const standardSections = {
    "10th": ["A", "B", "C", "D"],
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const standards = Object.keys(standardSections);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-200/30 to-indigo-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse delay-1000"></div>
      
      <div className="relative z-10 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-12 animate-fadeIn">
          <div className="space-y-2">
            <h1 className="text-5xl font-black bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">
              Admin Dashboard
            </h1>
            <div className="flex items-center space-x-2">
              <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <p className="text-gray-600 text-base font-medium">Manage standards and sections efficiently</p>
            </div>
          </div>
          <button
            onClick={() => handleLogout()}
            className="group relative px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300/50 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative font-semibold">Logout</span>
          </button>
        </header>

        {/* Enhanced Tab Navigation */}
        <section className="bg-white/80 backdrop-blur-xl p-6 mb-8 rounded-2xl shadow-xl border border-white/20 animate-slideUp">
          <div className="flex justify-center space-x-2 bg-gray-100/50 p-2 rounded-xl">
            <button
              onClick={() => setActiveTab("timetable")}
              className={`relative flex-1 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
                activeTab === "timetable"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-700 hover:bg-white/50 hover:text-gray-900"
              }`}
            >
              <span className="relative z-10">📅 Timetable Management</span>
              {activeTab === "timetable" && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-20 rounded-lg animate-pulse"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("teacher")}
              className={`relative flex-1 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
                activeTab === "teacher"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-700 hover:bg-white/50 hover:text-gray-900"
              }`}
            >
              <span className="relative z-10">👨‍🏫 Teachers</span>
              {activeTab === "teacher" && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-20 rounded-lg animate-pulse"></div>
              )}
            </button>
          </div>
        </section>

        {/* Timetable Section */}
        <section 
          className={`${
            activeTab === "timetable" 
              ? "bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 animate-fadeIn" 
              : "hidden"
          }`}
        >
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Class Timetable
              </h2>
            </div>
            <p className="text-gray-600 font-medium ml-5">Manage and edit timetable of all classes</p>
          </div>
          
          <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {standards.map((std, index) => (
              <div
                key={std}
                className="group transform transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <StandardCard
                    standard={std}
                    onClick={() => navigate(`/standard/${std}`)}
                  />
                  
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Teachers Section */}
        <section 
          className={`${
            activeTab === "teacher" 
              ? "bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 animate-fadeIn" 
              : "hidden"
          }`}
        >
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Teachers Management
              </h2>
            </div>
            <p className="text-gray-600 font-medium ml-5">Manage teachers and their assignments</p>
          </div>

          <div className="mt-8 animate-slideUp delay-300">
            <TeacherCardWithPagination />
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </main>
  );
};

export default Dashboard;

