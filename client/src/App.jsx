
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import TeachersDashboard from "./Pages/TeacherDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import TeacherSignup from "./Pages/TeacherSignup";
import AdminSignup from "./Pages/AdminSignup";
import StandardPage from "./Pages/StandardPage";
import SectionPage from "./Pages/SectionPage";
import NotFoundPage from "./Components/NotFound";
import EditPage from "./Pages/Edit";
import TeacherProfileEdit from "./Pages/TeacherProfileEdit"; // ADD
import AdminTeacherProfile from "./Pages/AdminTeacherProfile"; // ADD
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute";
import BulkTimetableCreator from "./Pages/BulkTimetableCreator.jsx";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/teacher-signup" element={<TeacherSignup />} />
        <Route path="/signup/admin-signup" element={<AdminSignup />} />

        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              {/* <AdminDashboard /> */}
              <BulkTimetableCreator/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        {/* NEW: Admin view teacher profile */}
        <Route
          path="/admin/teacher/:id"
          element={
            <ProtectedRoute role="admin">
              <AdminTeacherProfile />
            </ProtectedRoute>
          }
        />
        
        {/* Teacher Routes */}
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute role="teacher">
              <TeachersDashboard />
            </ProtectedRoute>
          }
        />
        {/* NEW: Teacher edit own profile */}
        <Route
          path="/teacher/profile/edit"
          element={
            <ProtectedRoute role="teacher">
              <TeacherProfileEdit />
            </ProtectedRoute>
          }
        />

        {/* Standard/Section Routes */}
        <Route
          path="/standard/:std"
          element={
            <ProtectedRoute role="admin">
              <StandardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/standard/:std/:section"
          element={
            <ProtectedRoute role="admin">
              <SectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/standard/:std/edit"
          element={
            <ProtectedRoute role="admin">
              <EditPage />
            </ProtectedRoute>
          }
        />

        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;