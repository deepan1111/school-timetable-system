

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeachersDashboard = () => {
  const [storedUser, setStoredUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); 
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "teacher") {
      navigate("/"); // not logged in / wrong role
      return;
    }
    setStoredUser(user); // ✅ update state
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">
          {/* ✅ Dynamic teacher name */}
          {storedUser ? `Welcome, Mr. ${storedUser.name}` : "Loading..."}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Logout
        </button>
      </div>

      {/* Upcoming Class Notification */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg mb-6 shadow">
        {/* You can show upcoming class here */}
      </div>

      {/* Assigned Sections */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Classes</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600">
              Class 10A
            </h3>
            <p className="text-gray-700">Subject: Mathematics</p>
            <button
              className="mt-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
            >
              View Timetable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersDashboard;
