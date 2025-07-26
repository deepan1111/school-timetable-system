import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import TeachersDashboard from "./Pages/TeacherDashboard"
import AdminDashboard from "./Pages/AdminDashboard"
import TeacherSignup from './Pages/TeacherSignup'
import AdminSignup from './Pages/AdminSignup'
import StandardPage from "./Pages/StandardPage"
import SectionPage from './Pages/SectionPage'
import NotFoundPage from './Components/NotFound'
import { Navigate } from 'react-router-dom'
import EditPage from './Pages/Edit'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/signup/teacher-signup" element={<TeacherSignup />} />
        <Route path="/signup/admin-signup" element={<AdminSignup />} />
        <Route path="/teacher-dashboard" element={<TeachersDashboard />} />
        <Route path="/standard/:std" element={<StandardPage />} />
        <Route path="/standard/:std/:section" element={<SectionPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
<Route path="*" element={<Navigate to="/not-found" />} />
<Route path="/standard/:std/edit" element={<EditPage />} />


      </Routes>
    </BrowserRouter>
  )
}
export default App