import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import TeachersDashboard from "./Pages/TeacherDashboard"
import AdminDashboard from "./Pages/AdminDashboard"
import TeacherSignup from './Pages/TeacherSignup'
import AdminSignup from './Pages/AdminSignup'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/teacher-signup" element={<TeacherSignup />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/teacher-dashboard" element={<TeachersDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App