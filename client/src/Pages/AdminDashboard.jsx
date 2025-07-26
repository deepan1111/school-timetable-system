// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import StandardCards from '../Components/StandardCards'
// const standards = ["5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];


// const AdminDashboard = () => {
//   const navigate = useNavigate();
//     const handleClick = (std) => {
//      navigate(`/standard/${standard}`);
    
//   };
//   return (
//      <div className="min-h-screen bg-gray-100 p-8">
//       <div className='flex justify-between items-center mb-6'>
//         <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>
//         <button className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md transition duration-200 '>Logout</button>
//       </div> 
      

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
//         {standards.map((std) => (
//           <StandardCards key={std} standard={std} onClick={() => handleClassClick(std)} />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard

import React from "react";
import { useNavigate } from "react-router-dom";
// import { standardSections } from "../data/standards";
import StandardCard from "../Components/StandardCards"

const Dashboard = () => {
  const navigate = useNavigate();
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

  const standards = Object.keys(standardSections);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">Logout</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {standards.map((std) => (
          <StandardCard key={std} standard={std} onClick={() => navigate(`/standard/${std}`)} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
