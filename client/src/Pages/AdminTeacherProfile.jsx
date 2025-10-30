import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AdminTeacherProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [teacher, setTeacher] = useState({
    teacher_id: '',
    name: '',
    email: '',
    phone: '',
    subject_id: '',
    subject_name: '',
    created_at: '',
    classes: []
  });
  
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
    subject_id: ''
  });
  
  const [subjects, setSubjects] = useState([]);
  
  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchTeacher();
    fetchSubjects();
  }, [id]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchTeacher = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/teacher/${id}`, {
        headers: getAuthHeaders(),
      });
      setTeacher(response.data);
      setEditData({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        subject_id: response.data.subject_id
      });
    } catch (err) {
      console.error('Error fetching teacher:', err);
      setError('Failed to load teacher profile');
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
        `${API_BASE_URL}/admin/teacher/${id}`,
        editData,
        {
          headers: getAuthHeaders(),
        }
      );

      setSuccess('Teacher profile updated successfully!');
      setIsEditing(false);
      fetchTeacher();
    } catch (err) {
      console.error('Error updating teacher:', err);
      setError(err.response?.data?.message || 'Failed to update teacher profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

      <div className="relative z-10 p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40 mb-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  Teacher Profile
                </h1>
                <p className="text-slate-600 font-semibold text-lg mt-2">
                  View and manage teacher information
                </p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-bold text-lg"
              >
                Edit Profile
              </button>
            )}
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2">
            {isEditing ? (
              // Edit Form
              <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 animate-slideUp">
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-bold text-slate-800 mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-slate-800 font-medium text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-slate-800 mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-slate-800 font-medium text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-slate-800 mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-slate-800 font-medium text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-slate-800 mb-3">
                      Subject
                    </label>
                    <select
                      name="subject_id"
                      value={editData.subject_id}
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
                      onClick={() => {
                        setIsEditing(false);
                        setEditData({
                          name: teacher.name,
                          email: teacher.email,
                          phone: teacher.phone,
                          subject_id: teacher.subject_id
                        });
                      }}
                      disabled={saving}
                      className="flex-1 px-8 py-5 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              // View Mode
              <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 animate-fadeIn">
                <div className="space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b border-slate-200">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                      👨‍🏫
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-slate-800">{teacher.name}</h2>
                      <p className="text-lg text-slate-600 font-semibold">{teacher.subject_name}</p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-500 mb-2">
                        Email Address
                      </label>
                      <p className="text-lg font-bold text-slate-800">{teacher.email}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-500 mb-2">
                        Phone Number
                      </label>
                      <p className="text-lg font-bold text-slate-800">{teacher.phone}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-500 mb-2">
                        Teacher ID
                      </label>
                      <p className="text-lg font-bold text-slate-800">#{teacher.teacher_id}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-500 mb-2">
                        Joined Date
                      </label>
                      <p className="text-lg font-bold text-slate-800">{formatDate(teacher.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Classes */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/40 animate-slideUp">
              <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📚</span>
                Assigned Classes
              </h3>
              <div className="space-y-3">
                {teacher.classes && teacher.classes.length > 0 ? (
                  teacher.classes.map((classItem) => (
                    <div
                      key={classItem.class_id}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100"
                    >
                      <h4 className="text-lg font-bold text-slate-800">{classItem.class_name}</h4>
                      <p className="text-sm text-slate-600 mt-1">{classItem.subject_name}</p>
                      <div className="flex gap-3 mt-2">
                        <span className="px-3 py-1 bg-white/80 rounded-lg text-xs font-semibold text-slate-700">
                          📍 {classItem.room_number}
                        </span>
                        <span className="px-3 py-1 bg-white/80 rounded-lg text-xs font-semibold text-slate-700">
                          👥 {classItem.student_count} students
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-center py-4">No classes assigned</p>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 shadow-2xl text-white">
              <h3 className="text-xl font-black mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-black">{teacher.classes?.length || 0}</div>
                  <div className="text-sm font-semibold opacity-90">Total Classes</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-black">
                    {teacher.classes?.reduce((sum, c) => sum + (c.student_count || 0), 0) || 0}
                  </div>
                  <div className="text-sm font-semibold opacity-90">Total Students</div>
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

export default AdminTeacherProfile;