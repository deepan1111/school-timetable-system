import React from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

// Configurable standards and sections
const standardSections = {
  "5th": ["A", "B"],
  "6th": ["A", "B", "C"],
  "7th": ["A", "B"],
  "8th": ["A", "B", "C", "D"],
  "9th": ["A", "B", "C"],
  "10th": ["A", "B", "C", "D"],
  "11th": ["A", "B"],
  "12th": ["A", "B", "C"],
};

const SectionPage = () => {
  const { std, section } = useParams();
  const navigate = useNavigate();

  const sections = standardSections[std];
  const normalizedSection = section?.toUpperCase();
  const isValid = sections && sections.includes(normalizedSection);

  // Redirect to not found if invalid
  if (!isValid) return <Navigate to="/not-found" replace />;

  // Dummy Data
  const timetable = [
    ["Math", "English", "Physics", "Break", "Chemistry"],
    ["Bio", "Tamil", "Physics", "Break", "Math"],
    ["PT", "English", "Social", "Break", "Comp"],
  ];
  const teachers = ["Mr. Ramesh - Math", "Ms. Priya - English", "Mrs. Kavitha - Physics"];

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition"
        >
          ⬅ Back
        </button>
      </div>

      {/* Section Container */}
      <div className="border rounded-xl shadow p-6 flex flex-col gap-6 bg-gray-50">
        {/* Header */}
        <div className="w-full bg-white border rounded-md text-center py-3 text-2xl font-bold text-gray-800">
          CLASS {std.toUpperCase()} {normalizedSection}
        </div>

        {/* Timetable + Teachers */}
        <div className="flex flex-col md:flex-row gap-8 mt-4">
          {/* Timetable */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-3">📅 Time Table</h2>
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full text-center text-sm">
                <thead>
                  <tr className="bg-indigo-200">
                    {["Period 1", "Period 2", "Period 3", "Break", "Period 4"].map((head, idx) => (
                      <th key={idx} className="border px-4 py-2">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timetable.map((row, i) => (
                    <tr key={i} className="even:bg-indigo-50">
                      {row.map((cell, j) => (
                        <td key={j} className="border px-4 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Teachers Handling */}
          <div className="w-full md:w-[250px] border-l pl-6">
            <h2 className="text-xl font-semibold mb-3">👩‍🏫 Teachers Handling</h2>
            <ul className="list-disc list-inside space-y-2">
              {teachers.map((teacher, i) => (
                <li key={i} className="text-gray-800 font-medium">
                  {teacher}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionPage;
