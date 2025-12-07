// frontend/src/Pages/BulkTimetableCreator.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BulkTimetableCreator = () => {
  const { std } = useParams();
  const navigate = useNavigate();
  const API_BASE = "http://localhost:5000/api";

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [teachersData, setTeachersData] = useState([]);
  
  const [config, setConfig] = useState({
    standard: std || "",
    sections: [],
    start_time: "08:00",
    period_duration: 45,
    working_days: 6,
    breaks: [
      { after_period: 3, duration: 15, label: "Break" },
      { after_period: 6, duration: 45, label: "Lunch" }
    ]
  });

  const [subjects, setSubjects] = useState([]);
  const [roomNumbers, setRoomNumbers] = useState({});

  // Standard sections mapping
  const availableSections = {
    "5th": ["A", "B"],
    "6th": ["A", "B", "C"],
    "7th": ["A", "B"],
    "8th": ["A", "B", "C", "D"],
    "9th": ["A", "B", "C"],
    "10th": ["A", "B", "C", "D"],
    "11th": ["A", "B"],
    "12th": ["A", "B", "C"]
  };

  useEffect(() => {
    fetchTeachersGrouped();
  }, []);

  const fetchTeachersGrouped = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE}/timetable/teachers-grouped`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeachersData(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleSectionToggle = (section) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.includes(section)
        ? prev.sections.filter(s => s !== section)
        : [...prev.sections, section]
    }));
  };

  const addSubject = () => {
    setSubjects(prev => [...prev, {
      subject_id: "",
      subject_name: "",
      teacher_ids: [],
      periods_per_week: 5
    }]);
  };

  const updateSubject = (index, field, value) => {
    setSubjects(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      
      // Auto-fill subject_name when subject_id is selected
      if (field === "subject_id") {
        const subjectData = teachersData.find(t => t.subject_id === parseInt(value));
        if (subjectData) {
          updated[index].subject_name = subjectData.subject_name;
        }
      }
      
      return updated;
    });
  };

  const removeSubject = (index) => {
    setSubjects(prev => prev.filter((_, i) => i !== index));
  };

  const toggleTeacherSelection = (subjectIndex, teacherId) => {
    setSubjects(prev => {
      const updated = [...prev];
      const current = updated[subjectIndex].teacher_ids;
      
      updated[subjectIndex].teacher_ids = current.includes(teacherId)
        ? current.filter(id => id !== teacherId)
        : [...current, teacherId];
      
      return updated;
    });
  };

  const handleSubmit = async () => {
    // Validation
    if (config.sections.length === 0) {
      alert("Please select at least one section");
      return;
    }
    
    if (subjects.length === 0) {
      alert("Please add at least one subject");
      return;
    }

    const invalidSubjects = subjects.filter(s => !s.subject_id || s.teacher_ids.length === 0);
    if (invalidSubjects.length > 0) {
      alert("All subjects must have at least one teacher assigned");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const payload = {
        standard: config.standard,
        sections: config.sections,
        subjects: subjects,
        room_numbers: roomNumbers,
        start_time: config.start_time,
        period_duration: config.period_duration,
        breaks: config.breaks,
        working_days: config.working_days
      };

      const response = await axios.post(
        `${API_BASE}/timetable/bulk-create`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
      navigate(`/standard/${std}`);
    } catch (error) {
      console.error("Error creating timetables:", error);
      alert(error.response?.data?.message || "Failed to create timetables");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-xl hover:bg-white/90 rounded-xl shadow-lg transition-all mb-4 text-slate-700 font-semibold"
          >
            ← Back
          </button>

          <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40">
            <h1 className="text-4xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Bulk Timetable Creator
            </h1>
            <p className="text-slate-600 font-semibold">
              Create timetables for all sections of Class {std} at once
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-2xl p-6 shadow-xl border border-white/40 mb-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    step >= s 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" 
                      : "bg-slate-200 text-slate-500"
                  }`}>
                    {s}
                  </div>
                  <span className={`ml-3 font-semibold ${step >= s ? "text-slate-800" : "text-slate-400"}`}>
                    {s === 1 ? "Setup" : s === 2 ? "Subjects" : "Rooms & Confirm"}
                  </span>
                </div>
                {s < 3 && <div className="flex-1 h-1 mx-4 bg-slate-200 rounded"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step 1: Basic Config */}
        {step === 1 && (
          <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40 animate-fadeIn">
            <h2 className="text-2xl font-black text-slate-800 mb-6">📋 Basic Configuration</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={config.start_time}
                  onChange={(e) => setConfig({...config, start_time: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Period Duration (minutes)
                </label>
                <input
                  type="number"
                  value={config.period_duration}
                  onChange={(e) => setConfig({...config, period_duration: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Working Days (Mon-Sat = 6, Mon-Fri = 5)
                </label>
                <input
                  type="number"
                  min="5"
                  max="6"
                  value={config.working_days}
                  onChange={(e) => setConfig({...config, working_days: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-800 mb-4">Select Sections</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-8">
              {(availableSections[std] || []).map(section => (
                <button
                  key={section}
                  onClick={() => handleSectionToggle(section)}
                  className={`py-4 rounded-xl font-bold text-lg transition-all ${
                    config.sections.includes(section)
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={config.sections.length === 0}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next: Add Subjects
            </button>
          </div>
        )}

        {/* Step 2: Subjects & Teachers */}
        {step === 2 && (
          <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40 animate-fadeIn">
            <h2 className="text-2xl font-black text-slate-800 mb-6">📚 Subject & Teacher Assignment</h2>
            
            {subjects.map((subject, index) => (
              <div key={index} className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 mb-6 border-2 border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-slate-800">Subject {index + 1}</h3>
                  <button
                    onClick={() => removeSubject(index)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Select Subject
                    </label>
                    <select
                      value={subject.subject_id}
                      onChange={(e) => updateSubject(index, "subject_id", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Choose Subject --</option>
                      {teachersData.map(td => (
                        <option key={td.subject_id} value={td.subject_id}>
                          {td.subject_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Periods Per Week
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={subject.periods_per_week}
                      onChange={(e) => updateSubject(index, "periods_per_week", parseInt(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {subject.subject_id && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Select Teachers (will be distributed across sections)
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {teachersData.find(td => td.subject_id === parseInt(subject.subject_id))?.teachers.map(teacher => (
                        <button
                          key={teacher.teacher_id}
                          onClick={() => toggleTeacherSelection(index, teacher.teacher_id)}
                          className={`p-4 rounded-xl text-left transition-all ${
                            subject.teacher_ids.includes(teacher.teacher_id)
                              ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                              : "bg-white border-2 border-slate-200 hover:border-blue-400"
                          }`}
                        >
                          <div className="font-bold">{teacher.name}</div>
                          <div className="text-sm opacity-80">{teacher.email}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={addSubject}
              className="w-full py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl mb-6"
            >
              + Add Another Subject
            </button>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={subjects.length === 0}
                className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl disabled:opacity-50"
              >
                Next: Room Numbers
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Room Numbers & Confirmation */}
        {step === 3 && (
          <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40 animate-fadeIn">
            <h2 className="text-2xl font-black text-slate-800 mb-6">🏫 Room Numbers (Optional)</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {config.sections.map(section => (
                <div key={section}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Section {section}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 101"
                    value={roomNumbers[section] || ""}
                    onChange={(e) => setRoomNumbers({...roomNumbers, [section]: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">📊 Summary</h3>
              <div className="space-y-2 text-slate-700">
                <p><strong>Standard:</strong> {config.standard}</p>
                <p><strong>Sections:</strong> {config.sections.join(", ")}</p>
                <p><strong>Subjects:</strong> {subjects.length}</p>
                <p><strong>Working Days:</strong> {config.working_days} days/week</p>
                <p><strong>Period Duration:</strong> {config.period_duration} minutes</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold rounded-xl disabled:opacity-50"
              >
                {loading ? "Creating Timetables..." : "🚀 Create All Timetables"}
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </main>
  );
};

export default BulkTimetableCreator;