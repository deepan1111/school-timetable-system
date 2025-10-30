// import { useState, useEffect } from 'react';
// import {
//   getTeacherProfile,
//   getTeacherClasses,
//   getTodaySchedule,
//   getTeacherStats,
//   getRecentActivity
// } from '../api/teacherApi';

// export const useTeacherData = () => {
//   const [data, setData] = useState({
//     profile: null,
//     classes: [],
//     schedule: [],
//     stats: null,
//     activity: []
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const [profile, classes, schedule, stats, activity] = await Promise.all([
//           getTeacherProfile(),
//           getTeacherClasses(),
//           getTodaySchedule(),
//           getTeacherStats(),
//           getRecentActivity()
//         ]);

//         setData({
//           profile,
//           classes,
//           schedule,
//           stats,
//           activity
//         });
//       } catch (err) {
//         console.error('Error fetching teacher data:', err);
//         setError(err.response?.data?.message || 'Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, []);

//   const refetchData = async () => {
//     setLoading(true);
//     try {
//       const [profile, classes, schedule, stats, activity] = await Promise.all([
//         getTeacherProfile(),
//         getTeacherClasses(),
//         getTodaySchedule(),
//         getTeacherStats(),
//         getRecentActivity()
//       ]);

//       setData({
//         profile,
//         classes,
//         schedule,
//         stats,
//         activity
//       });
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to refresh data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { data, loading, error, refetchData };
// };

import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTeacherData = () => {
  const [data, setData] = useState({
    profile: null,
    classes: [],
    schedule: [],
    weeklySchedule: [],  // NEW
    upcomingClass: null, // NEW
    activity: [],
    stats: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = "http://localhost:5000/api";

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication required");
      setLoading(false);
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [
        profileRes,
        classesRes,
        scheduleRes,
        weeklyScheduleRes,  // NEW
        upcomingClassRes,    // NEW
        activityRes,
        statsRes
      ] = await Promise.all([
        axios.get(`${API_BASE}/teacher/profile`, { headers }),
        axios.get(`${API_BASE}/teacher/classes`, { headers }),
        axios.get(`${API_BASE}/teacher/schedule/today`, { headers }),
        axios.get(`${API_BASE}/teacher/schedule/weekly`, { headers }),  // NEW
        axios.get(`${API_BASE}/teacher/schedule/upcoming`, { headers }), // NEW
        axios.get(`${API_BASE}/teacher/activity`, { headers }),
        axios.get(`${API_BASE}/teacher/stats`, { headers })
      ]);

      setData({
        profile: profileRes.data,
        classes: classesRes.data,
        schedule: scheduleRes.data,
        weeklySchedule: weeklyScheduleRes.data,  // NEW
        upcomingClass: upcomingClassRes.data,     // NEW
        activity: activityRes.data,
        stats: statsRes.data
      });
    } catch (err) {
      console.error("Error fetching teacher data:", err);
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Refresh every 60 seconds to update upcoming class
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetchData: fetchData };
};