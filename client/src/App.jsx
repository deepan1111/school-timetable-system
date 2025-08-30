
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
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/teacher-signup" element={<TeacherSignup />} />
        <Route path="/signup/admin-signup" element={<AdminSignup />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute role="teacher">
              <TeachersDashboard />
            </ProtectedRoute>
          }
        />

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

        <Route path="/standard/:std" element={<StandardPage />} />
        <Route path="/standard/:std/:section" element={<SectionPage />} />
        <Route path="/standard/:std/edit" element={<EditPage />} />

        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
