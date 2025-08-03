import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeachersDashboard = () => {
  const [teacherInfo, setTeacherInfo] = useState({
    name: 'Mr. Deepan',
    assignedSections: [
      { std: '10th', section: 'A', subject: 'Maths' },
      { std: '9th', section: 'B', subject: 'Science' }
    ],
    upcomingClass: {
      time: '10:45 AM',
      std: '10th',
      section: 'A',
      subject: 'Maths'
    }
  });

  const navigate = useNavigate();

  // If you're using authentication, check auth state here
  useEffect(() => {
    // fetch teacher data from API or context here
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">
          Welcome, {teacherInfo.name}
        </h1>
        <button
          onClick={() => navigate('/')}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Logout
        </button>
      </div>

      {/* Upcoming Class Notification */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg mb-6 shadow">
        <p>
          ⏰ <strong>Upcoming Class:</strong> {teacherInfo.upcomingClass.std} {teacherInfo.upcomingClass.section} - {teacherInfo.upcomingClass.subject} at {teacherInfo.upcomingClass.time}
        </p>
      </div>

      {/* Assigned Sections */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Classes</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {teacherInfo.assignedSections.map((cls, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-indigo-600">
                {cls.std} - {cls.section}
              </h3>
              <p className="text-gray-700">Subject: {cls.subject}</p>
              <button
                onClick={() => navigate(`/standard/${cls.std}/${cls.section}`)}
                className="mt-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
              >
                View Timetable
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachersDashboard;
