import React, { useEffect, useState } from "react";

const EditPage = () => {
  const [config, setConfig] = useState({
    numSections: "",
    numPeriods: "",
    workingDays: "",
    periodDuration: "",
    numBreaks: "",
    lunchBreakDuration: "",
    numSubjects: "",
  });

  const [allTeachers, setAllTeachers] = useState([]);
  const [subjectTeacherMap, setSubjectTeacherMap] = useState([]);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    fetch("/api/teachers")
      .then((res) => res.json())
      .then((data) => setAllTeachers(data));
  }, []);

  const handleConfigChange = (key, value) => {
    setConfig({ ...config, [key]: value });
  };

  const handleNumSubjectsSubmit = () => {
    const num = parseInt(config.numSubjects);
    if (num > 0) {
      const subjects = Array.from({ length: num }, () => ({
        subject: "",
        teacherCount: 1,
        teachers: [""],
      }));
      setSubjectTeacherMap(subjects);
    }
  };

  const updateSubjectInfo = (index, key, value) => {
    const updated = [...subjectTeacherMap];
    if (key === "teacherCount") {
      const count = parseInt(value);
      updated[index].teacherCount = count;
      updated[index].teachers = Array(count).fill("");
    } else {
      updated[index][key] = value;
    }
    setSubjectTeacherMap(updated);
  };

  const updateTeacherSelection = (subIdx, tIdx, value) => {
    const updated = [...subjectTeacherMap];
    updated[subIdx].teachers[tIdx] = value;
    setSubjectTeacherMap(updated);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-10 text-center">
        Timetable Setup
      </h1>

      {/* Step 1: General Config */}
      <div className="bg-white shadow rounded-lg p-6 mb-12 border">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Step 1: General Setup
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(config).map(([key, value]) => (
            <div key={key}>
              <label className="block mb-1 font-medium text-sm capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => handleConfigChange(key, e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleNumSubjectsSubmit}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm"
        >
          Next: Define Subjects
        </button>
      </div>

      {/* Step 2: Subject Mapping */}
      {subjectTeacherMap.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Step 2: Subject & Teacher Assignment
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {subjectTeacherMap.map((item, index) => (
              <div
                key={index}
                className="min-w-[300px] bg-white border border-gray-200 shadow-md rounded-lg p-5"
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    value={item.subject}
                    onChange={(e) =>
                      updateSubjectInfo(index, "subject", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Number of Teachers
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={item.teacherCount}
                    onChange={(e) =>
                      updateSubjectInfo(index, "teacherCount", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>

                <div className="space-y-3">
                  {item.teachers.map((teacherEmail, tIndex) => {
                    const eligible = allTeachers.filter((t) =>
                      item.subject
                        ? t.subjects.includes(item.subject.toLowerCase())
                        : true
                    );

                    return (
                      <div key={tIndex}>
                        <label className="block text-sm font-medium mb-1">
                          Select Teacher {tIndex + 1}
                        </label>
                        <select
                          value={teacherEmail}
                          onChange={(e) =>
                            updateTeacherSelection(index, tIndex, e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        >
                          <option value="">-- Choose --</option>
                          {eligible.map((t) => (
                            <option key={t.id} value={t.email}>
                              {t.name} ({t.email})
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Edit / Save Button */}
          <div className="flex justify-end mt-6">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => {
                  // Save logic here if needed
                  setIsEditing(false);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Save
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPage;
