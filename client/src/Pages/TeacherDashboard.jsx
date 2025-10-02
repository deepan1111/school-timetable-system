

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

const TeachersDashboard = () => {
  const [storedUser, setStoredUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState('overview');

  // Mock data - replace with actual API calls
  const teacherClasses = [
    { id: 1, class: '10A', subject: 'Mathematics', students: 45, nextClass: '09:00 AM', room: 'R-301' },
    { id: 2, class: '10B', subject: 'Mathematics', students: 42, nextClass: '11:00 AM', room: 'R-302' },
    { id: 3, class: '10C', subject: 'Mathematics', students: 48, nextClass: '02:00 PM', room: 'R-301' },
  ];

  const upcomingClasses = [
    { class: '10A', subject: 'Mathematics', time: '09:00 AM', room: 'R-301', duration: '45 min' },
    { class: '10B', subject: 'Mathematics', time: '11:00 AM', room: 'R-302', duration: '45 min' },
    { class: '10C', subject: 'Mathematics', time: '02:00 PM', room: 'R-301', duration: '45 min' },
  ];

  const recentActivity = [
    { type: 'assignment', title: 'Algebra Quiz submitted', class: '10A', time: '2 hours ago', icon: '📝' },
    { type: 'attendance', title: 'Attendance marked', class: '10B', time: '3 hours ago', icon: '✅' },
    { type: 'material', title: 'Study material uploaded', class: '10C', time: '5 hours ago', icon: '📚' },
  ];

  const quickStats = [
    { label: 'Total Classes', value: '3', icon: '🎓', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Total Students', value: '135', icon: '👥', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50' },
    { label: 'This Week', value: '18', icon: '📅', color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-50' },
    { label: 'Pending Tasks', value: '7', icon: '📋', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50' },
  ];

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
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/15 via-indigo-400/15 to-purple-400/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-300/10 to-blue-300/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 animate-float-delayed"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="relative z-10 p-8 max-w-[1800px] mx-auto">
        {/* Enhanced Header */}
        <header className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40 mb-8 animate-fadeIn">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-4xl shadow-xl shadow-blue-500/30 transform hover:scale-110 transition-transform duration-300">
                  👨‍🏫
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 bg-clip-text text-transparent tracking-tight">
                  {getGreeting()}, {storedUser ? storedUser.name : "Loading..."}!
                </h1>
                <p className="text-slate-600 font-semibold text-lg mt-1">{formatDate(currentTime)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-slate-600 font-medium">Live Clock</div>
              </div>
              <button
                onClick={handleLogout}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-500 via-red-600 to-rose-600 hover:from-red-600 hover:via-red-700 hover:to-rose-700 text-white rounded-2xl shadow-xl hover:shadow-2xl shadow-red-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400/40 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative font-bold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slideUp">
          {quickStats.map((stat, index) => (
            <div 
              key={index}
              className="group bg-white/70 backdrop-blur-2xl rounded-2xl p-6 shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fadeInStagger"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 font-semibold text-sm mb-1">{stat.label}</p>
                  <h3 className="text-4xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    {stat.value}
                  </h3>
                </div>
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                  {stat.icon}
                </div>
              </div>
              <div className={`mt-4 h-2 ${stat.bgColor} rounded-full overflow-hidden`}>
                <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full w-3/4 animate-pulse`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Classes Alert */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-2xl p-6 mb-8 shadow-xl animate-slideUp">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0 animate-bounce">
              ⏰
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-amber-900 mb-1">Next Class Coming Up!</h3>
              <p className="text-amber-800 font-medium">
                Class 10A - Mathematics at 09:00 AM in Room R-301
              </p>
              <div className="flex items-center gap-4 mt-3">
                <span className="px-4 py-2 bg-white/80 rounded-lg text-amber-900 font-semibold text-sm shadow">
                  📍 Room R-301
                </span>
                <span className="px-4 py-2 bg-white/80 rounded-lg text-amber-900 font-semibold text-sm shadow">
                  ⏱️ 45 minutes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/70 backdrop-blur-2xl p-3 mb-8 rounded-3xl shadow-2xl border border-white/40 animate-slideUp">
          <div className="flex gap-2 bg-gradient-to-r from-slate-100/80 via-blue-50/50 to-slate-100/80 p-2 rounded-2xl">
            {['overview', 'schedule', 'activity'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`relative flex-1 font-bold px-8 py-4 rounded-xl transition-all duration-500 transform hover:scale-[1.02] active:scale-95 ${
                  activeSection === section
                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white shadow-2xl shadow-blue-500/40"
                    : "text-slate-700 hover:bg-white/70 hover:text-slate-900 hover:shadow-lg"
                }`}
              >
                <span className="relative z-10 capitalize text-lg">
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Classes or Schedule */}
          <div className="lg:col-span-2">
            {activeSection === 'overview' && (
              <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40 animate-fadeIn">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-2 h-12 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600 rounded-full shadow-lg"></div>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Your Classes
                  </h2>
                </div>
                <div className="grid gap-6">
                  {teacherClasses.map((classItem, index) => (
                    <div 
                      key={classItem.id}
                      className="group bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-blue-100/50 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 animate-fadeInStagger"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                            🎓
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-slate-800">Class {classItem.class}</h3>
                            <p className="text-slate-600 font-semibold">{classItem.subject}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {classItem.students}
                          </div>
                          <div className="text-sm text-slate-600 font-medium">Students</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-white/80 rounded-xl p-3 shadow text-center">
                          <div className="text-sm text-slate-600 font-medium mb-1">Next Class</div>
                          <div className="text-lg font-bold text-blue-600">{classItem.nextClass}</div>
                        </div>
                        <div className="bg-white/80 rounded-xl p-3 shadow text-center">
                          <div className="text-sm text-slate-600 font-medium mb-1">Room</div>
                          <div className="text-lg font-bold text-indigo-600">{classItem.room}</div>
                        </div>
                        <div className="bg-white/80 rounded-xl p-3 shadow text-center">
                          <div className="text-sm text-slate-600 font-medium mb-1">Duration</div>
                          <div className="text-lg font-bold text-purple-600">45m</div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                          View Timetable
                        </button>
                        <button className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                          Mark Attendance
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'schedule' && (
              <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40 animate-fadeIn">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-2 h-12 bg-gradient-to-b from-emerald-600 via-green-600 to-teal-600 rounded-full shadow-lg"></div>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Today's Schedule
                  </h2>
                </div>
                <div className="space-y-4">
                  {upcomingClasses.map((classItem, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-4 bg-gradient-to-r from-white to-emerald-50/30 rounded-2xl p-5 shadow-lg hover:shadow-xl border border-emerald-100/50 transition-all duration-300 transform hover:scale-[1.02] animate-fadeInStagger"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-20 text-center">
                        <div className="text-2xl font-black text-emerald-600">{classItem.time.split(' ')[0]}</div>
                        <div className="text-sm font-semibold text-slate-600">{classItem.time.split(' ')[1]}</div>
                      </div>
                      <div className="w-1 h-16 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-slate-800">{classItem.class} - {classItem.subject}</h4>
                        <div className="flex gap-3 mt-2">
                          <span className="px-3 py-1 bg-white/80 rounded-lg text-sm font-semibold text-slate-700">📍 {classItem.room}</span>
                          <span className="px-3 py-1 bg-white/80 rounded-lg text-sm font-semibold text-slate-700">⏱️ {classItem.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'activity' && (
              <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40 animate-fadeIn">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-2 h-12 bg-gradient-to-b from-purple-600 via-pink-600 to-rose-600 rounded-full shadow-lg"></div>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Recent Activity
                  </h2>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 bg-gradient-to-r from-white to-purple-50/30 rounded-2xl p-5 shadow-lg hover:shadow-xl border border-purple-100/50 transition-all duration-300 transform hover:scale-[1.02] animate-fadeInStagger"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-slate-800">{activity.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm font-semibold text-purple-600">{activity.class}</span>
                          <span className="text-sm text-slate-500">•</span>
                          <span className="text-sm text-slate-600">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/40 animate-slideUp delay-300">
              <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-left flex items-center gap-3">
                  <span className="text-2xl">📝</span>
                  <span>Create Assignment</span>
                </button>
                <button className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-left flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <span>Mark Attendance</span>
                </button>
                <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-left flex items-center gap-3">
                  <span className="text-2xl">📚</span>
                  <span>Upload Material</span>
                </button>
                <button className="w-full px-6 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-left flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <span>View Reports</span>
                </button>
              </div>
            </div>

            {/* Today's Summary */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 shadow-2xl text-white animate-slideUp delay-400">
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <span className="text-2xl">📌</span>
                Today's Summary
              </h3>
              <div className="space-y-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-black">3</div>
                  <div className="text-sm font-semibold opacity-90">Classes Today</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-black">2</div>
                  <div className="text-sm font-semibold opacity-90">Assignments Due</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-black">95%</div>
                  <div className="text-sm font-semibold opacity-90">Avg Attendance</div>
                </div>
              </div>
            </div>
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