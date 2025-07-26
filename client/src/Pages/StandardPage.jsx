// import React from "react";
// import { useParams } from "react-router-dom";
// import ClassCard from "../Components/StandardCards";

// const StandardPage = () => {
//   const { std } = useParams();
//   const sections = ["A", "B", "C"]; // Customize as needed

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         {std} Standard Sections
//       </h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//         {sections.map((section) => (
//           <ClassCard key={section} standard={`${std} ${section}`} onClick={() => alert(`${std} ${section} clicked`)} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StandardPage;

import React from "react";
import { useParams } from "react-router-dom";
import StandardsCard from "../components/StandardCards";

const StandardPage = () => {
  const { std } = useParams();
  // data/standards.js (or directly inside Dashboard.jsx if small project)

 const standardSections = {
  "5th": ["A", "B"],
  "6th": ["A", "B", "C"],
  "7th": ["A", "B"],
  "8th": ["A", "B", "C", "D"],
  "9th": ["A", "B", "C"],
  "10th": ["A", "B", "C", "D"],
  "11th": ["A", "B"],
  "12th": ["A", "B", "C"]
};

  const sections = standardSections[std] || [];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{std} Standard</h2>
        <button onClick={() => window.history.back()} className="px-3 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Back</button>
      </div>

      {sections.length === 0 ? (
        <p className="text-gray-600">No sections available for {std}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {sections.map((sec) => (
            <StandardsCard
              key={sec}
              standard={`${std} ${sec}`}
              onClick={() => alert(`Clicked ${std} ${sec}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StandardPage;
