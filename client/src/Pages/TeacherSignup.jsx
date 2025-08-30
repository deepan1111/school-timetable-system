

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TeacherSignup() {
  const subjects = ["Math", "Science", "English", "History", "Computer Science"];

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    subject: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/teacher-signup", formData);

    if (res.data.success) {
      // Save token + user (if backend sends them)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect teacher
      navigate("/");
    } else {
      alert(res.data.message || "Signup failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error signing up");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Teacher Signup</h2>
          <p className="text-gray-500 text-sm">Create your EduSched teacher account</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg"/>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg"/>
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg"/>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg"/>
          {/* <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg"/> */}
          <select name="subject" value={formData.subject} required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange}>
            <option value="">Select Subject</option>
  {subjects.map((subj, index) => (
    <option key={index} value={subj}>
      {subj}
    </option>
  ))}
          </select>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
