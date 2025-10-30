

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const SectionPage = () => {
//   const { std, section } = useParams(); // Get class and section from URL
//   const navigate = useNavigate();

//   const [timetable, setTimetable] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("timetable");

//   const API_BASE = "http://localhost:5000/api"; // Backend URL

//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   const periods = [
//     { label: "Period 1", time: "08:00", end: "08:45" },
//     { label: "Period 2", time: "08:45", end: "09:30" },
//     { label: "Period 3", time: "09:30", end: "10:15" },
//     { label: "Break", time: "10:15", end: "10:30", isBreak: true },
//     { label: "Period 4", time: "10:30", end: "11:15" },
//     { label: "Period 5", time: "11:15", end: "12:00" },
//     { label: "Lunch", time: "12:00", end: "12:45", isBreak: true },
//     { label: "Period 6", time: "12:45", end: "13:30" },
//   ];

//   useEffect(() => {
//     fetchData();
//   }, [std, section]);

//   // Fetch timetable and teachers
//   const fetchData = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("Authentication required");
//       setLoading(false);
//       return;
//     }

//     try {
//       const [timetableRes, teachersRes] = await Promise.all([
//         axios.get(`${API_BASE}/timetable/${std}/${section}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//         axios.get(`${API_BASE}/timetable/${std}/${section}/teachers`, {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//       ]);

//       setTimetable(timetableRes.data);
//       setTeachers(teachersRes.data);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setError(err.response?.data?.message || "Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Find timetable entry for a given day and period
//   const getTimetableCell = (dayIndex, period) => {
//     if (period.isBreak) {
//       return { type: "break", label: period.label };
//     }

//     const cell = timetable.find((item) => {
//       const itemDay = item.day_of_week - 1; // Convert 1-6 to 0-5
//       const itemTime = item.start_time.substring(0, 5); // HH:MM
//       return itemDay === dayIndex && itemTime === period.time;
//     });

//     return cell || null;
//   };

//   if (loading) {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-6 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-600 text-lg font-semibold">Loading timetable...</p>
//         </div>
//       </main>
//     );
//   }

//   if (error) {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-6">
//         <div className="max-w-2xl mx-auto">
//           <div className="bg-red-50 border-l-4 border-red-500 rounded-2xl p-6 shadow-xl">
//             <div className="flex items-start gap-4">
//               <div className="text-3xl">⚠️</div>
//               <div>
//                 <h3 className="text-lg font-bold text-red-900 mb-2">{error}</h3>
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
//                 >
//                   Go Back
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 p-4 sm:p-6 lg:p-8">
//       {/* Header */}
//       <div className="max-w-7xl mx-auto mb-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-xl hover:bg-white/90 rounded-xl shadow-lg transition-all mb-4 text-slate-700 font-semibold"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//           Back
//         </button>

//         <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
//                 🎓
//               </div>
//               <div>
//                 <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
//                   Class {std} {section.toUpperCase()}
//                 </h1>
//                 <p className="text-slate-600 font-semibold text-sm sm:text-base">
//                   {timetable.length > 0 && timetable[0].room_number
//                     ? `Room ${timetable[0].room_number}`
//                     : "Room TBA"}
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setActiveTab("timetable")}
//                 className={`px-6 py-3 rounded-xl font-bold transition-all ${
//                   activeTab === "timetable"
//                     ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
//                     : "bg-white/50 text-slate-700 hover:bg-white/80"
//                 }`}
//               >
//                 📅 Timetable
//               </button>
//               <button
//                 onClick={() => setActiveTab("teachers")}
//                 className={`px-6 py-3 rounded-xl font-bold transition-all ${
//                   activeTab === "teachers"
//                     ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
//                     : "bg-white/50 text-slate-700 hover:bg-white/80"
//                 }`}
//               >
//                 👨‍🏫 Teachers
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-7xl mx-auto">
//         {activeTab === "timetable" ? (
//           <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/40">
//             <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
//               <span className="text-3xl">📅</span>
//               Weekly Schedule
//             </h2>

//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse min-w-[800px]">
//                 <thead>
//                   <tr className="bg-gradient-to-r from-blue-600 to-indigo-600">
//                     <th className="border-2 border-white px-4 py-3 text-white font-bold text-sm">
//                       Time / Day
//                     </th>
//                     {days.map((day) => (
//                       <th
//                         key={day}
//                         className="border-2 border-white px-4 py-3 text-white font-bold text-sm"
//                       >
//                         {day}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {periods.map((period, periodIdx) => {
//                     if (period.isBreak) {
//                       return (
//                         <tr key={periodIdx}>
//                           <td className="border-2 border-slate-200 px-4 py-3 bg-slate-50 font-semibold text-sm">
//                             <div className="text-slate-800">{period.label}</div>
//                             <div className="text-xs text-slate-500">
//                               {period.time} - {period.end}
//                             </div>
//                           </td>
//                           <td
//                             colSpan={6}
//                             className="border-2 border-slate-200 px-4 py-3 text-center bg-gradient-to-r from-orange-100 to-amber-100 font-bold text-orange-800"
//                           >
//                             ☕ {period.label}
//                           </td>
//                         </tr>
//                       );
//                     }

//                     return (
//                       <tr key={periodIdx} className="hover:bg-blue-50/50 transition-colors">
//                         <td className="border-2 border-slate-200 px-4 py-3 bg-slate-50 font-semibold text-sm">
//                           <div className="text-slate-800">{period.label}</div>
//                           <div className="text-xs text-slate-500">
//                             {period.time} - {period.end}
//                           </div>
//                         </td>
//                         {days.map((day, dayIdx) => {
//                           const cell = getTimetableCell(dayIdx, period);

//                           if (!cell) {
//                             return (
//                               <td
//                                 key={dayIdx}
//                                 className="border-2 border-slate-200 px-4 py-3 bg-white"
//                               >
//                                 <div className="text-center text-slate-400 text-sm">-</div>
//                               </td>
//                             );
//                           }

//                           return (
//                             <td key={dayIdx} className="border-2 border-slate-200 p-2 bg-white">
//                               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2 hover:shadow-md transition-shadow">
//                                 <div className="font-bold text-blue-900 text-sm mb-1">
//                                   {cell.subject_name || "Subject"}
//                                 </div>
//                                 <div className="text-xs text-slate-600 truncate">
//                                   👨‍🏫 {cell.teacher_name || "TBA"}
//                                 </div>
//                               </div>
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {timetable.length === 0 && (
//               <div className="text-center py-12">
//                 <div className="text-6xl mb-4">📅</div>
//                 <p className="text-slate-600 text-lg font-semibold">No timetable created yet</p>
//                 <p className="text-slate-500 text-sm mt-2">
//                   Contact admin to set up the schedule
//                 </p>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40">
//             <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
//               <span className="text-3xl">👨‍🏫</span>
//               Teachers Handling This Class
//             </h2>

//             {teachers.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="text-6xl mb-4">👥</div>
//                 <p className="text-slate-600 text-lg">No teachers assigned yet</p>
//               </div>
//             ) : (
//               <div className="grid gap-4 sm:gap-6">
//                 {teachers.map((teacher) => (
//                   <div
//                     key={teacher.teacher_id}
//                     className="group bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-blue-100/50 transition-all transform hover:scale-[1.02]"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
//                         👤
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-xl font-bold text-slate-800">{teacher.name}</h3>
//                         <p className="text-sm text-slate-600 mt-1">📧 {teacher.email}</p>
//                         <p className="text-sm text-slate-600">📞 {teacher.phone}</p>
//                         <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
//                           {teacher.subject_name}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// export default SectionPage;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SectionPage = () => {
  const { std, section } = useParams();
  const navigate = useNavigate();

  const [timetable, setTimetable] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("timetable");

  const API_BASE = "http://localhost:5000/api";

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const periods = [
    { label: "Period 1", time: "08:00", end: "08:45" },
    { label: "Period 2", time: "08:45", end: "09:30" },
    { label: "Period 3", time: "09:30", end: "10:15" },
    { label: "Break", time: "10:15", end: "10:30", isBreak: true },
    { label: "Period 4", time: "10:30", end: "11:15" },
    { label: "Period 5", time: "11:15", end: "12:00" },
    { label: "Lunch", time: "12:00", end: "12:45", isBreak: true },
    { label: "Period 6", time: "12:45", end: "13:30" },
    { label: "Period 7", time: "13:30", end: "14:15" },
    { label: "Period 8", time: "14:15", end: "15:00" },
  ];

  useEffect(() => {
    fetchData();
  }, [std, section]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication required");
      setLoading(false);
      return;
    }

    try {
      const [timetableRes, teachersRes] = await Promise.all([
        axios.get(`${API_BASE}/timetable/${std}/${section}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_BASE}/timetable/${std}/${section}/teachers`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setTimetable(timetableRes.data);
      setTeachers(teachersRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const getTimetableCell = (dayIndex, period) => {
    if (period.isBreak) {
      return { type: "break", label: period.label };
    }

    const cell = timetable.find((item) => {
      const itemDay = item.day_of_week - 1;
      const itemTime = item.start_time.substring(0, 5);
      return itemDay === dayIndex && itemTime === period.time;
    });

    return cell || null;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg font-semibold">Loading timetable...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚠️</div>
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-2">{error}</h3>
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-xl hover:bg-white/90 rounded-xl shadow-lg transition-all mb-4 text-slate-700 font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                🎓
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Class {std} {section.toUpperCase()}
                </h1>
                <p className="text-slate-600 font-semibold text-sm sm:text-base">
                  {timetable.length > 0 && timetable[0].room_number
                    ? `Room ${timetable[0].room_number}`
                    : "Room TBA"}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab("timetable")}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  activeTab === "timetable"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "bg-white/50 text-slate-700 hover:bg-white/80"
                }`}
              >
                📅 Timetable
              </button>
              <button
                onClick={() => setActiveTab("teachers")}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  activeTab === "teachers"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "bg-white/50 text-slate-700 hover:bg-white/80"
                }`}
              >
                👨‍🏫 Teachers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto">
        {activeTab === "timetable" ? (
          <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/40">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-3xl">📅</span>
              Weekly Schedule (Monday - Saturday)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <th className="border-2 border-white px-3 py-3 text-white font-bold text-sm">
                      Period
                    </th>
                    {days.map((day) => (
                      <th
                        key={day}
                        className="border-2 border-white px-3 py-3 text-white font-bold text-sm"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {periods.map((period, periodIdx) => {
                    if (period.isBreak) {
                      return (
                        <tr key={periodIdx}>
                          <td className="border-2 border-slate-200 px-3 py-3 bg-slate-50 font-semibold text-sm">
                            <div className="text-slate-800">{period.label}</div>
                            <div className="text-xs text-slate-500">
                              {period.time} - {period.end}
                            </div>
                          </td>
                          <td
                            colSpan={6}
                            className="border-2 border-slate-200 px-3 py-3 text-center bg-gradient-to-r from-orange-100 to-amber-100 font-bold text-orange-800"
                          >
                            ☕ {period.label}
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr key={periodIdx} className="hover:bg-blue-50/50 transition-colors">
                        <td className="border-2 border-slate-200 px-3 py-3 bg-slate-50 font-semibold text-sm">
                          <div className="text-slate-800">{period.label}</div>
                          <div className="text-xs text-slate-500">
                            {period.time} - {period.end}
                          </div>
                        </td>
                        {days.map((day, dayIdx) => {
                          const cell = getTimetableCell(dayIdx, period);

                          if (!cell) {
                            return (
                              <td
                                key={dayIdx}
                                className="border-2 border-slate-200 px-2 py-2 bg-white"
                              >
                                <div className="text-center text-slate-400 text-sm">-</div>
                              </td>
                            );
                          }

                          return (
                            <td key={dayIdx} className="border-2 border-slate-200 p-2 bg-white">
                              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2 hover:shadow-md transition-shadow">
                                <div className="font-bold text-blue-900 text-xs mb-1">
                                  {cell.subject_name || "Subject"}
                                </div>
                                <div className="text-xs text-slate-600 truncate">
                                  {cell.teacher_name || "TBA"}
                                </div>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {timetable.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-slate-600 text-lg font-semibold">No timetable created yet</p>
                <p className="text-slate-500 text-sm mt-2">
                  Contact admin to set up the schedule
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-3xl">👨‍🏫</span>
              Teachers Handling This Class
            </h2>

            {teachers.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <p className="text-slate-600 text-lg">No teachers assigned yet</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                {teachers.map((teacher) => (
                  <div
                    key={teacher.teacher_id}
                    className="group bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-blue-100/50 transition-all transform hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                        👤
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800">{teacher.name}</h3>
                        <p className="text-sm text-slate-600 mt-1">📧 {teacher.email}</p>
                        <p className="text-sm text-slate-600">📞 {teacher.phone}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          {teacher.subject_name}
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
    </main>
  );
};

export default SectionPage;