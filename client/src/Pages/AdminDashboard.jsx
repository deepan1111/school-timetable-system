
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StandardCard from "../Components/StandardCards";
import TeacherCardWithPagination from "../Components/TeacherCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [systemStatus, setSystemStatus] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const API_BASE_URL = "http://localhost:5000/api";

  const standardSections = {
    "10th": ["A", "B"],
  };

  // Fetch dashboard statistics
  useEffect(() => {
    fetchDashboardStats();
    fetchRecentActivity();
    fetchSystemStatus();
  }, []);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: getAuthHeaders(),
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        throw new Error("Failed to fetch stats");
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      setError("Failed to load dashboard statistics");
      setStats({
        totalTeachers: 0,
        totalSubjects: 0,
        recentTeachers: 0,
        totalClasses: 0,
        activeClasses: 0,
        growth: { teachers: "0" },
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/activity?limit=10`, {
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setRecentActivity(data);
      }
    } catch (error) {
      console.error("Error fetching activity:", error);
    }
  };

  const fetchSystemStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/system-status`, {
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setSystemStatus(data);
      }
    } catch (error) {
      console.error("Error fetching system status:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const standards = Object.keys(standardSections);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const quickStats = [
    {
      label: "Total Teachers",
      value: stats?.totalTeachers || "0",
      icon: "👨‍🏫",
      color: "from-blue-500 to-blue-600",
      trend: stats?.growth?.teachers ? `${stats.growth.teachers > 0 ? '+' : ''}${stats.growth.teachers}%` : "0%",
      trendUp: parseFloat(stats?.growth?.teachers || 0) >= 0,
    },
    {
      label: "Total Subjects",
      value: stats?.totalSubjects || "0",
      icon: "📚",
      color: "from-purple-500 to-purple-600",
      trend: "Stable",
      trendUp: true,
    },
    {
      label: "Recent Teachers",
      value: stats?.recentTeachers || "0",
      icon: "🆕",
      color: "from-emerald-500 to-emerald-600",
      trend: "Last 30 days",
      trendUp: true,
    },
    {
      label: "Total Users",
      value: systemStatus?.activeUsers || "0",
      icon: "👥",
      color: "from-orange-500 to-orange-600",
      trend: "Active",
      trendUp: true,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/15 via-indigo-400/15 to-purple-400/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-float"></div>
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-300/10 to-blue-300/10 rounded-full blur-3xl translate-x-1/3 animate-float-delayed"></div>
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-indigo-300/10 to-purple-300/10 rounded-full blur-3xl translate-y-1/2 animate-float-slow"></div>

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative z-10 p-8 max-w-[1800px] mx-auto">
        {/* Enhanced Header with Live Clock */}
        <header className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40 mb-8 animate-fadeIn">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-4xl shadow-xl shadow-blue-500/30 transform hover:scale-110 transition-transform duration-300">
                  👨‍💼
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-6xl font-black bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 bg-clip-text text-transparent tracking-tight leading-tight">
                  Admin Dashboard
                </h1>
                <p className="text-slate-600 text-lg font-semibold mt-2">
                  {formatDate(currentTime)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  Live Clock
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="group relative px-10 py-4 bg-gradient-to-r from-red-500 via-red-600 to-rose-600 hover:from-red-600 hover:via-red-700 hover:to-rose-700 text-white rounded-2xl shadow-xl hover:shadow-2xl shadow-red-500/25 hover:shadow-red-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400/40 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative font-bold text-lg tracking-wide flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-2xl p-6 mb-8 animate-slideUp">
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚠️</div>
              <div>
                <h3 className="text-lg font-bold text-red-900">{error}</h3>
                <button
                  onClick={() => {
                    setError(null);
                    fetchDashboardStats();
                    fetchRecentActivity();
                    fetchSystemStatus();
                  }}
                  className="mt-2 text-red-600 font-semibold hover:text-red-800"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-2xl rounded-2xl p-6 shadow-xl border border-white/40 animate-pulse"
              >
                <div className="h-24 bg-slate-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slideUp">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-2xl rounded-2xl p-6 shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fadeInStagger"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-slate-600 font-semibold text-sm mb-2">
                      {stat.label}
                    </p>
                    <h3 className="text-5xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      {stat.value}
                    </h3>
                    <div
                      className={`mt-2 flex items-center gap-1 text-sm font-bold ${
                        stat.trendUp ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {stat.trendUp ? "↑" : "↓"} {stat.trend}
                    </div>
                  </div>
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}
                  >
                    {stat.icon}
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full w-3/4 animate-pulse`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Tab Navigation */}
        <section className="bg-white/70 backdrop-blur-2xl p-3 mb-10 rounded-3xl shadow-2xl border border-white/40 animate-slideUp">
          <div className="flex gap-3 bg-gradient-to-r from-slate-100/80 via-blue-50/50 to-slate-100/80 p-2.5 rounded-2xl">
            {[
              { id: "overview", label: "Overview", icon: "📊" },
              { id: "timetable", label: "Timetable", icon: "📅" },
              { id: "teacher", label: "Teachers", icon: "👨‍🏫" },
              { id: "activity", label: "Activity", icon: "📋" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 font-bold px-8 py-5 rounded-xl transition-all duration-500 transform hover:scale-[1.02] active:scale-95 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white shadow-2xl shadow-blue-500/40"
                    : "text-slate-700 hover:bg-white/70 hover:text-slate-900 hover:shadow-lg"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                  <span className="text-2xl">{tab.icon}</span>
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0 rounded-xl animate-shimmer"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur-lg opacity-30 animate-pulse"></div>
                  </>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Overview Section */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-8 animate-fadeIn">
            {/* Main Content - Quick Actions */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-2 h-12 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600 rounded-full shadow-lg"></div>
                  <h2 className="text-4xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Quick Actions
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <button 
                    onClick={() => setActiveTab("timetable")}
                    className="group bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-blue-100/50 transition-all duration-500 transform hover:scale-105 text-left"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-4 transform group-hover:rotate-6 transition-transform duration-300">
                      📅
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">
                      Manage Timetables
                    </h3>
                    <p className="text-slate-600 font-medium">
                      Create and edit class schedules
                    </p>
                  </button>

                  <button 
                    onClick={() => setActiveTab("teacher")}
                    className="group bg-gradient-to-br from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-emerald-100/50 transition-all duration-500 transform hover:scale-105 text-left"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-4 transform group-hover:rotate-6 transition-transform duration-300">
                      👨‍🏫
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">
                      Manage Teachers
                    </h3>
                    <p className="text-slate-600 font-medium">
                      Add and assign teachers
                    </p>
                  </button>

                  <button className="group bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-purple-100/50 transition-all duration-500 transform hover:scale-105 text-left">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-4 transform group-hover:rotate-6 transition-transform duration-300">
                      📊
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">
                      View Reports
                    </h3>
                    <p className="text-slate-600 font-medium">
                      Analytics and insights
                    </p>
                  </button>

                  <button className="group bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-orange-100/50 transition-all duration-500 transform hover:scale-105 text-left">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-4 transform group-hover:rotate-6 transition-transform duration-300">
                      ⚙️
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">
                      Settings
                    </h3>
                    <p className="text-slate-600 font-medium">
                      System configuration
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar - Recent Activity & System Status */}
            <div className="space-y-6">
              <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/40">
                <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentActivity.length > 0 ? (
                    recentActivity.slice(0, 5).map((activity, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-100"
                      >
                        <p className="text-sm font-semibold text-slate-800">
                          {activity.description}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {activity.timestamp}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-center py-4">
                      No recent activity
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 shadow-2xl text-white">
                <h3 className="text-xl font-black mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Server Status</span>
                      <span className={`${systemStatus?.server === "online" ? "text-emerald-300" : "text-red-300"}`}>
                        ●
                      </span>
                    </div>
                    <div className="text-2xl font-black capitalize">
                      {systemStatus?.server || "Loading..."}
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Database</span>
                      <span className={`${systemStatus?.database === "connected" ? "text-emerald-300" : "text-red-300"}`}>
                        ●
                      </span>
                    </div>
                    <div className="text-2xl font-black capitalize">
                      {systemStatus?.database || "Loading..."}
                    </div>
                  </div>
                  {systemStatus?.uptime && (
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Uptime</span>
                      </div>
                      <div className="text-2xl font-black">
                        {systemStatus.uptime}
                      </div>
                    </div>
                  )}
                  {systemStatus?.memory && (
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Memory Usage</span>
                      </div>
                      <div className="text-lg font-bold">
                        {systemStatus.memory.used} / {systemStatus.memory.total}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timetable Section */}
        {activeTab === "timetable" && (
          <section className="bg-white/70 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 animate-fadeIn">
            <div className="mb-10">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-2 h-12 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600 rounded-full shadow-lg shadow-blue-500/30"></div>
                <div>
                  <h2 className="text-4xl font-black bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                    Class Timetable
                  </h2>
                  <p className="text-slate-600 font-semibold text-base mt-1">
                    Manage and edit timetable of all classes
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {standards.map((std, index) => (
                <div
                  key={std}
                  className="group transform transition-all duration-700 hover:scale-110 hover:-translate-y-3 animate-fadeInStagger"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <StandardCard
                      standard={std}
                      onClick={() => navigate(`/standard/${std}`)}
                    />
                   <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 pointer-events-none"></div>

                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Teachers Section */}
        {activeTab === "teacher" && (
          <section className="bg-white/70 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 animate-fadeIn">
            <div className="mb-10">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-2 h-12 bg-gradient-to-b from-emerald-600 via-green-600 to-teal-600 rounded-full shadow-lg shadow-green-500/30"></div>
                <div>
                  <h2 className="text-4xl font-black bg-gradient-to-r from-slate-800 via-emerald-800 to-green-800 bg-clip-text text-transparent">
                    Teachers Management
                  </h2>
                  <p className="text-slate-600 font-semibold text-base mt-1">
                    Manage teachers and their assignments
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 animate-slideUp delay-300">
              <TeacherCardWithPagination />
            </div>
          </section>
        )}

        {/* Activity Section */}
        {activeTab === "activity" && (
          <section className="bg-white/70 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 animate-fadeIn">
            <div className="mb-10">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-2 h-12 bg-gradient-to-b from-purple-600 via-pink-600 to-rose-600 rounded-full shadow-lg"></div>
                <div>
                  <h2 className="text-4xl font-black bg-gradient-to-r from-slate-800 via-purple-800 to-pink-800 bg-clip-text text-transparent">
                    System Activity
                  </h2>
                  <p className="text-slate-600 font-semibold text-base mt-1">
                    Monitor all system activities and logs
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-gradient-to-r from-white to-purple-50/30 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-purple-100/50 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                      📌
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-slate-800">
                        {activity.description}
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        {activity.timestamp}
                      </p>
                      {activity.user && (
                        <p className="text-xs text-slate-500 mt-1">
                          By: {activity.user}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-slate-500 text-xl font-semibold">
                    No activity recorded yet
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInStagger {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(-50%, -50%) translateY(0px) rotate(0deg);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translate(33%, 0) translateY(0px) rotate(0deg);
          }
          50% {
            transform: translate(33%, 0) translateY(20px) rotate(-5deg);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 50%) translateX(0px);
          }
          50% {
            transform: translate(0, 50%) translateX(20px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
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

        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </main>
  );
};

export default Dashboard;