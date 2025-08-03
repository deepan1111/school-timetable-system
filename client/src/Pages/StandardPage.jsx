// // import React from "react";
// // import { useParams, useNavigate } from "react-router-dom";

// // const StandardPage = () => {
// //   const { std } = useParams();
// //   const navigate = useNavigate();

// //   const standardSections = {
// //     "5th": ["A", "B"],
// //     "6th": ["A", "B", "C"],
// //     "7th": ["A", "B"],
// //     "8th": ["A", "B", "C", "D"],
// //     "9th": ["A", "B", "C"],
// //     "10th": ["A", "B", "C", "D", "E", "F"],
// //     "11th": ["A", "B"],
// //     "12th": ["A", "B", "C"]
// //   };

// //   const sections = standardSections[std] || [];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 p-6">
// //       {/* Back Button */}
// //       <div className="mb-6">
// //         <button
// //           onClick={() => navigate(-1)}
// //           className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow-sm"
// //         >
// //           ⬅ Back
// //         </button>
// //       </div>

// //       {/* Main Card */}
// //       <div className="bg-white border rounded-2xl shadow-xl p-8 flex flex-col gap-6">
// //         {/* Header */}
// //         <h1 className="text-3xl font-bold text-center text-indigo-700">Class {std.toUpperCase()}</h1>

// //         <div className="flex flex-col lg:flex-row gap-8">
// //           {/* Section Cards */}
// //           <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6">
// //             {sections.map((sec) => (
// //               <div
// //                 key={sec}
// //                 onClick={() => navigate(`/standard/${std}/${sec}`)}
// //                 className="bg-indigo-100 hover:bg-indigo-600 hover:text-white text-indigo-800 rounded-xl shadow-md cursor-pointer text-center py-6 text-xl font-semibold transition-all duration-200"
// //               >
// //                 {std} {sec}
// //               </div>
// //             ))}
// //           </div>

// //           {/* Divider + Button */}
// //           <div className="hidden lg:flex flex-col items-center justify-start border-l pl-6">
// //             <button
// //               onClick={() => navigate("/edit")}
// //               className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition"
// //             >
// //               ✏️ Edit Sections
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StandardPage;


// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const StandardPage = () => {
//   const { std } = useParams(); // e.g., "10th"
//   const navigate = useNavigate();

//   const standardSections = {
//     "5th": ["A", "B"],
//     "6th": ["A", "B", "C"],
//     "7th": ["A", "B"],
//     "8th": ["A", "B", "C", "D"],
//     "9th": ["A", "B", "C"],
//     "10th": ["A", "B", "C", "D", "E", "F"],
//     "11th": ["A", "B"],
//     "12th": ["A", "B", "C"]
//   };

//   const sections = standardSections[std] || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 p-6">
//       {/* Back Button */}
//       <div className="mb-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow-sm"
//         >
//           ⬅ Back
//         </button>
//       </div>

//       {/* Main Card */}
//       <div className="bg-white border rounded-2xl shadow-xl p-8 flex flex-col gap-6">
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-center text-indigo-700">Class {std.toUpperCase()}</h1>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Section Cards */}
//           <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6">
//             {sections.map((sec) => (
//               <div
//                 key={sec}
//                 onClick={() => navigate(`/standard/${std}/${sec}`)}
//                 className="bg-indigo-100 hover:bg-indigo-600 hover:text-white text-indigo-800 rounded-xl shadow-md cursor-pointer text-center py-6 text-xl font-semibold transition-all duration-200"
//               >
//                 {std} {sec}
//               </div>
//             ))}
//           </div>

//           {/* Divider + Edit Button */}
//           <div className="hidden lg:flex flex-col items-center justify-start border-l pl-6">
//             <button
//               onClick={() => navigate(`/standard/${std}/edit`)}
//               className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition"
//             >
//               ✏️ Edit Sections
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StandardPage;


import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const StandardPage = () => {
  const { std } = useParams(); // e.g., "10th"
  const navigate = useNavigate();

  const standardSections = {
    "5th": ["A", "B"],
    "6th": ["A", "B", "C"],
    "7th": ["A", "B"],
    "8th": ["A", "B", "C", "D"],
    "9th": ["A", "B", "C"],
    "10th": ["A", "B", "C", "D", "E", "F"],
    "11th": ["A", "B"],
    "12th": ["A", "B", "C"]
  };

  const sections = standardSections[std] || [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-6">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow transition"
        >
          ⬅ Back
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 tracking-tight">
          Class {std?.toUpperCase()}
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Select a section to view or edit timetable
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Section Cards */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {sections.map((sec) => (
              <div
                key={sec}
                onClick={() => navigate(`/standard/${std}/${sec}`)}
                className="cursor-pointer bg-indigo-100 hover:bg-indigo-600 hover:text-white text-indigo-800 rounded-xl shadow-md text-center py-6 text-xl font-semibold transition-all duration-200 transform hover:scale-105"
              >
                {std} {sec}
              </div>
            ))}
          </div>

          {/* Divider + Edit Button */}
          <div className="hidden lg:flex flex-col items-center justify-start border-l pl-6">
            <button
              onClick={() => navigate(`/standard/${std}/edit`)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
            >
              ✏️ Edit Sections
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StandardPage;
