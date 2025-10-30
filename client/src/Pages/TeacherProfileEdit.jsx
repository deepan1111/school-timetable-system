import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherProfileEdit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    subject_id: '',
    subject_name: ''
  });
  
  const [subjects, setSubjects] = useState([]);
  
  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchProfile();
    fetchSubjects();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teacher/profile`, {
        headers: getAuthHeaders(),
      });
      setProfile(response.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/subjects`, {
        headers: getAuthHeaders(),
      });
      setSubjects(response.data);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await axios.put(
        `${API_BASE_URL}/teacher/profile`,
        {
          name: profile.name,
          phone: profile.phone,
          subject_id: profile.subject_id,
        },
        {
          headers: getAuthHeaders(),
        }
      );

      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        navigate('/teacher-dashboard');
      }, 1500);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 flex items-center justify-center p-6">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/15 via-indigo-400/15 to-purple-400/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-300/10 to-blue-300/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 animate-float-delayed"></div>

      <div className="relative z-10 p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40 mb-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => navigate('/teacher-dashboard')}
                className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  Edit Profile
                </h1>
                <p className="text-slate-600 font-semibold text-lg mt-2">
                  Update your personal information
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-2xl p-6 mb-6 animate-slideUp">
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚠️</div>
              <div>
                <h3 className="text-lg font-bold text-red-900">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-2xl p-6 mb-6 animate-slideUp">
            <div className="flex items-start gap-4">
              <div className="text-3xl">✅</div>
              <div>
                <h3 className="text-lg font-bold text-emerald-900">{success}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 animate-slideUp">
          <div className="space-y-8">
            {/* Name */}
            <div>
              <label className="block text-lg font-bold text-slate-800 mb-3">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-slate-800 font-medium text-lg"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-lg font-bold text-slate-800 mb-3">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-6 py-4 bg-slate-100 border-2 border-slate-200 rounded-2xl text-slate-600 font-medium text-lg cursor-not-allowed"
              />
              <p className="text-sm text-slate-500 mt-2">Email cannot be changed</p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-lg font-bold text-slate-800 mb-3">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-slate-800 font-medium text-lg"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-lg font-bold text-slate-800 mb-3">
                Subject
              </label>
              <select
                name="subject_id"
                value={profile.subject_id}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-slate-800 font-medium text-lg"
              >
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject.subject_id} value={subject.subject_id}>
                    {subject.subject_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-8 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/teacher-dashboard')}
                disabled={saving}
                className="flex-1 px-8 py-5 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
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
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
};

export default TeacherProfileEdit;