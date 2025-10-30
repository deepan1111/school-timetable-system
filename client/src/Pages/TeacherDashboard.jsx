

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const TeachersDashboard = () => {
//   const [storedUser, setStoredUser] = useState(null);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/"); 
//   };

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || user.role !== "teacher") {
//       navigate("/"); // not logged in / wrong role
//       return;
//     }
//     setStoredUser(user); // ✅ update state
//   }, [navigate]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-indigo-700">
//           {/* ✅ Dynamic teacher name */}
//           {storedUser ? `Welcome, Mr. ${storedUser.name}` : "Loading..."}
//         </h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Upcoming Class Notification */}
//       <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg mb-6 shadow">
//         {/* You can show upcoming class here */}
//       </div>

//       {/* Assigned Sections */}
//       <div>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Classes</h2>
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
//           <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold text-indigo-600">
//               Class 10A
//             </h3>
//             <p className="text-gray-700">Subject: Mathematics</p>
//             <button
//               className="mt-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
//             >
//               View Timetable
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeachersDashboard;


import React, { useEffect, useState } from 'react';
import { useTeacherData } from '../hooks/useTeacherData';
import { useNavigate } from "react-router-dom";
const TeachersDashboard = () => {
  const [storedUser, setStoredUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();
  const { data, loading, error, refetchData } = useTeacherData();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "teacher") {
      window.location.href = "/";
      return;
    }
    setStoredUser(user);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffHours / 24)} day${Math.floor(diffHours / 24) > 1 ? 's' : ''} ago`;
  };

  // Loading State
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-[1800px] mx-auto">
          {/* Header Skeleton */}
          <div className="bg-white/70 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/40 mb-6 sm:mb-8 animate-pulse">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-300 rounded-2xl"></div>
                <div>
                  <div className="h-8 sm:h-12 w-48 sm:w-64 bg-slate-300 rounded mb-2"></div>
                  <div className="h-4 sm:h-6 w-32 sm:w-48 bg-slate-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/70 backdrop-blur-2xl rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-white/40 animate-pulse">
                <div className="h-20 bg-slate-300 rounded"></div>
              </div>
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white/70 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl border border-white/40 animate-pulse">
              <div className="h-96 bg-slate-300 rounded"></div>
            </div>
            <div className="bg-white/70 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl border border-white/40 animate-pulse">
              <div className="h-96 bg-slate-300 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error State
  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">⚠️</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-900 mb-2">Error Loading Dashboard</h3>
                <p className="text-red-800 mb-4">{error}</p>
                <div className="flex gap-3">
                  <button
                    onClick={refetchData}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg transition-all duration-300"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-xl font-bold shadow-lg transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const teacherClasses = data.classes || [];
  const upcomingClasses = data.schedule || [];
  const recentActivity = data.activity || [];
  const stats = data.stats || {};

  const quickStats = [
    { 
      label: 'Total Classes', 
      value: stats.totalClasses || '0', 
      icon: '🎓', 
      color: 'from-blue-500 to-blue-600', 
      bgColor: 'bg-blue-50' 
    },
    { 
      label: 'Total Students', 
      value: stats.totalStudents || '0', 
      icon: '👥', 
      color: 'from-purple-500 to-purple-600', 
      bgColor: 'bg-purple-50' 
    },
    { 
      label: 'This Week', 
      value: stats.weekClasses || '0', 
      icon: '📅', 
      color: 'from-emerald-500 to-emerald-600', 
      bgColor: 'bg-emerald-50' 
    },
    { 
      label: 'Pending Tasks', 
      value: stats.pendingTasks || '0', 
      icon: '📋', 
      color: 'from-orange-500 to-orange-600', 
      bgColor: 'bg-orange-50' 
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-br from-blue-400/15 via-indigo-400/15 to-purple-400/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-gradient-to-tr from-cyan-300/10 to-blue-300/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 animate-float-delayed"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-[1800px] mx-auto">
        {/* Enhanced Header */}
        <header className="bg-white/70 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/40 mb-6 sm:mb-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <div className="relative">
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-4xl shadow-xl shadow-blue-500/30 transform hover:scale-110 transition-transform duration-300">
                  👨‍🏫
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-emerald-500 rounded-full border-2 sm:border-4 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 bg-clip-text text-transparent tracking-tight">
                  {getGreeting()}, {storedUser?.name || data.profile?.name || "Teacher"}!
                </h1>
                <p className="text-slate-600 font-semibold text-sm sm:text-base lg:text-lg mt-1">
                  {formatDate(currentTime)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="text-right flex-1 sm:flex-initial">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {formatTime(currentTime)}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">Live Clock</div>
              </div>
              <button
  onClick={() => navigate('/teacher/profile/edit')}
  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-left flex items-center gap-3"
>
  <span className="text-2xl">👤</span>
  <span>Edit Profile</span>
</button>
              <button
                onClick={handleLogout}
                className="group relative px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-gradient-to-r from-red-500 via-red-600 to-rose-600 hover:from-red-600 hover:via-red-700 hover:to-rose-700 text-white rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl shadow-red-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400/40 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative font-bold flex items-center gap-2 text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline">Logout</span>
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 animate-slideUp">
          {quickStats.map((stat, index) => (
            <div 
              key={index}
              className="group bg-white/70 backdrop-blur-2xl rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fadeInStagger"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 font-semibold text-xs sm:text-sm mb-1">{stat.label}</p>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    {stat.value}
                  </h3>
                </div>
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl lg:text-3xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                  {stat.icon}
                </div>
              </div>
              <div className={`mt-3 sm:mt-4 h-1.5 sm:h-2 ${stat.bgColor} rounded-full overflow-hidden`}>
                <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full w-3/4 animate-pulse`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Classes Alert */}
        {upcomingClasses.length > 0 && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl animate-slideUp">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg flex-shrink-0 animate-bounce">
                ⏰
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-1">Next Class Coming Up!</h3>
                <p className="text-sm sm:text-base text-amber-800 font-medium">
                  {upcomingClasses[0].class_name} - {upcomingClasses[0].subject_name} at {upcomingClasses[0].start_time} in Room {upcomingClasses[0].room_number}
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3">
                  <span className="px-2 sm:px-4 py-1.5 sm:py-2 bg-white/80 rounded-lg text-amber-900 font-semibold text-xs sm:text-sm shadow">
                    📍 Room {upcomingClasses[0].room_number}
                  </span>
                  <span className="px-2 sm:px-4 py-1.5 sm:py-2 bg-white/80 rounded-lg text-amber-900 font-semibold text-xs sm:text-sm shadow">
                    ⏱️ {upcomingClasses[0].duration} minutes
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white/70 backdrop-blur-2xl p-2 sm:p-3 mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/40 animate-slideUp overflow-x-auto">
          <div className="flex gap-2 bg-gradient-to-r from-slate-100/80 via-blue-50/50 to-slate-100/80 p-2 rounded-xl sm:rounded-2xl min-w-max sm:min-w-0">
            {['overview', 'schedule', 'activity'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`relative flex-1 font-bold px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl transition-all duration-500 transform hover:scale-[1.02] active:scale-95 whitespace-nowrap text-sm sm:text-base lg:text-lg ${
                  activeSection === section
                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white shadow-2xl shadow-blue-500/40"
                    : "text-slate-700 hover:bg-white/70 hover:text-slate-900 hover:shadow-lg"
                }`}
              >
                <span className="relative z-10 capitalize">
                  {section === 'overview' && '📊 '}{section === 'schedule' && '📅 '}{section === 'activity' && '📋 '}
                  {section}
                </span>
                {activeSection === section && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur-lg opacity-30 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Classes or Schedule */}
          <div className="lg:col-span-2">
            {activeSection === 'overview' && (
              <div className="bg-white/70 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/40 animate-fadeIn">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-1.5 sm:w-2 h-10 sm:h-12 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600 rounded-full shadow-lg"></div>
                  <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Your Classes
                  </h2>
                </div>
                
                {teacherClasses.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="text-4xl sm:text-6xl mb-4">📚</div>
                    <p className="text-slate-600 text-base sm:text-lg">No classes assigned yet</p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:gap-6">
                    {teacherClasses.map((classItem, index) => (
                      <div 
                        key={classItem.class_id}
                        className="group bg-gradient-to-br from-white to-blue-50/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl border border-blue-100/50 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 animate-fadeInStagger"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                              🎓
                            </div>
                            <div>
                              <h3 className="text-xl sm:text-2xl font-black text-slate-800">{classItem.class_name}</h3>
                              <p className="text-slate-600 font-semibold text-sm sm:text-base">{classItem.subject_name}</p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right">
                            <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                              {classItem.student_count}
                            </div>
                            <div className="text-xs sm:text-sm text-slate-600 font-medium">Students</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
                          <div className="bg-white/80 rounded-lg sm:rounded-xl p-2 sm:p-3 shadow text-center">
                            <div className="text-xs sm:text-sm text-slate-600 font-medium mb-1">Next Class</div>
                            <div className="text-sm sm:text-lg font-bold text-blue-600">
                              {classItem.next_class_time || 'TBA'}
                            </div>
                          </div>
                          <div className="bg-white/80 rounded-lg sm:rounded-xl p-2 sm:p-3 shadow text-center">
                            <div className="text-xs sm:text-sm text-slate-600 font-medium mb-1">Room</div>
                            <div className="text-sm sm:text-lg font-bold text-indigo-600">{classItem.room_number}</div>
                          </div>
                          <div className="bg-white/80 rounded-lg sm:rounded-xl p-2 sm:p-3 shadow text-center">
                            <div className="text-xs sm:text-sm text-slate-600 font-medium mb-1">Duration</div>
                            <div className="text-sm sm:text-lg font-bold text-purple-600">45m</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <button className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg sm:rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base">
                            View Timetable
                          </button>
                          <button className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-lg sm:rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base">
                            Mark Attendance
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === 'schedule' && (
              <div className="bg-white/70 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/40 animate-fadeIn">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-1.5 sm:w-2 h-10 sm:h-12 bg-gradient-to-b from-emerald-600 via-green-600 to-teal-600 rounded-full shadow-lg"></div>
                  <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Today's Schedule
                  </h2>
                </div>
                
                {upcomingClasses.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="text-4xl sm:text-6xl mb-4">📅</div>
                    <p className="text-slate-600 text-base sm:text-lg">No classes scheduled for today</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {upcomingClasses.map((classItem, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-white to-emerald-50/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl border border-emerald-100/50 transition-all duration-300 transform hover:scale-[1.02] animate-fadeInStagger"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-16 sm:w-20 text-center flex-shrink-0">
                          <div className="text-xl sm:text-2xl font-black text-emerald-600">
                            {classItem.start_time?.split(':').slice(0, 2).join(':')}
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-slate-600">AM</div>
                        </div>
                        <div className="w-0.5 sm:w-1 h-12 sm:h-16 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full"></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base sm:text-xl font-bold text-slate-800 truncate">
                            {classItem.class_name} - {classItem.subject_name}
                          </h4>
                          <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
                            <span className="px-2 sm:px-3 py-1 bg-white/80 rounded-lg text-xs sm:text-sm font-semibold text-slate-700">
                              📍 {classItem.room_number}
                            </span>
                            <span className="px-2 sm:px-3 py-1 bg-white/80 rounded-lg text-xs sm:text-sm font-semibold text-slate-700">
                              ⏱️ {classItem.duration}m
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === 'activity' && (
              <div className="bg-white/70 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/40 animate-fadeIn">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-1.5 sm:w-2 h-10 sm:h-12 bg-gradient-to-b from-purple-600 via-pink-600 to-rose-600 rounded-full shadow-lg"></div>
                  <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Recent Activity
                  </h2>
                </div>
                
                {recentActivity.length === 0? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="text-4xl sm:text-6xl mb-4">📋</div>
                    <p className="text-slate-600 text-base sm:text-lg">No recent activity</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-3 sm:gap-4 bg-gradient-to-r from-white to-purple-50/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl border border-purple-100/50 transition-all duration-300 transform hover:scale-[1.02] animate-fadeInStagger"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg flex-shrink-0">
                          {activity.activity_type === 'assignment' ? '📝' : 
                           activity.activity_type === 'attendance' ? '✅' : '📚'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base sm:text-lg font-bold text-slate-800 truncate">
                            {activity.activity_title}
                          </h4>
                          <div className="flex items-center gap-2 sm:gap-3 mt-1">
                            <span className="text-xs sm:text-sm font-semibold text-purple-600">
                              {activity.class_name}
                            </span>
                            <span className="text-xs sm:text-sm text-slate-500">•</span>
                            <span className="text-xs sm:text-sm text-slate-600">
                              {getTimeAgo(activity.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Quick Actions & Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/40 animate-slideUp delay-300">
              <h3 className="text-lg sm:text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-xl sm:text-2xl">⚡</span>
                Quick Actions
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <button className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg sm:rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-left flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="text-xl sm:text-2xl">📝</span>
                  <span>Create Assignment</span>
                </button>
                <button className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-lg sm:rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-left flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="text-xl sm:text-2xl">✅</span>
                  <span>Mark Attendance</span>
                </button>
                <button className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg sm:rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-left flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="text-xl sm:text-2xl">📚</span>
                  <span>Upload Material</span>
                </button>
                <button className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg sm:rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-left flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="text-xl sm:text-2xl">📊</span>
                  <span>View Reports</span>
                </button>
              </div>
            </div>

            {/* Today's Summary */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl text-white animate-slideUp delay-400">
              <h3 className="text-lg sm:text-xl font-black mb-4 flex items-center gap-2">
                <span className="text-xl sm:text-2xl">📌</span>
                Today's Summary
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl font-black">{upcomingClasses.length}</div>
                  <div className="text-xs sm:text-sm font-semibold opacity-90">Classes Today</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl font-black">{stats.pendingTasks || 0}</div>
                  <div className="text-xs sm:text-sm font-semibold opacity-90">Assignments Due</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl font-black">95%</div>
                  <div className="text-xs sm:text-sm font-semibold opacity-90">Avg Attendance</div>
                </div>
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={refetchData}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/70 backdrop-blur-2xl hover:bg-white/90 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl border border-white/40 transition-all duration-300 transform hover:scale-105 active:scale-95 font-bold text-slate-700 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInStagger {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(33%, -33%) translateY(0px); }
          50% { transform: translate(33%, -33%) translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(-25%, 25%) translateY(0px); }
          50% { transform: translate(-25%, 25%) translateY(20px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 1s ease-out forwards;
        }
        
        .animate-fadeInStagger {
          animation: fadeInStagger 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
        
        .delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </main>
  );
};

export default TeachersDashboard;