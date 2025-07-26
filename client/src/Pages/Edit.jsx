import React, { useState } from "react";

const EditPage = () => {
  const [sections, setSections] = useState(3);
  const [teachers, setTeachers] = useState(8);
  const [subjects, setSubjects] = useState([
    "English",
    "Maths",
    "Science",
    "Tamil",
    "Social",
    "Computer Science",
  ]);
  const [periodsPerDay, setPeriodsPerDay] = useState(7);
  const [workingDays, setWorkingDays] = useState(5);
  const [periodDuration, setPeriodDuration] = useState(45);
  const [breakAfter, setBreakAfter] = useState(3);

  const handleEdit = () => {
    alert("Saved changes!");
    // Save logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl space-y-6 border">
        <h2 className="text-2xl font-bold text-center text-indigo-700 border-b pb-2">
          Edit Timetable Settings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 text-lg">
          <div>
            <label className="block font-medium">Number of Sections:</label>
            <input
              type="number"
              className="w-full px-4 py-2 mt-1 border rounded-md"
              value={sections}
              onChange={(e) => setSections(parseInt(e.target.value))}
            />
          </div>

          <div>
            <label className="block font-medium">Number of Teachers:</label>
            <input
              type="number"
              className="w-full px-4 py-2 mt-1 border rounded-md"
              value={teachers}
              onChange={(e) => setTeachers(parseInt(e.target.value))}
            />
          </div>

          <div className="col-span-2">
            <label className="block font-medium">Subjects:</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {subjects.map((sub, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium">Periods per Day:</label>
            <input
              type="number"
              className="w-full px-4 py-2 mt-1 border rounded-md"
              value={periodsPerDay}
              onChange={(e) => setPeriodsPerDay(parseInt(e.target.value))}
            />
          </div>

          <div>
            <label className="block font-medium">Working Days:</label>
            <input
              type="number"
              className="w-full px-4 py-2 mt-1 border rounded-md"
              value={workingDays}
              onChange={(e) => setWorkingDays(parseInt(e.target.value))}
            />
          </div>

          <div>
            <label className="block font-medium">Period Duration (mins):</label>
            <input
              type="number"
              className="w-full px-4 py-2 mt-1 border rounded-md"
              value={periodDuration}
              onChange={(e) => setPeriodDuration(parseInt(e.target.value))}
            />
          </div>

          <div>
            <label className="block font-medium">Break After Period:</label>
            <select
              className="w-full px-4 py-2 mt-1 border rounded-md"
              value={breakAfter}
              onChange={(e) => setBreakAfter(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleEdit}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
