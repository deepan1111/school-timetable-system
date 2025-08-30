


// import React, { useEffect, useState } from "react";
// import ProfileImage from "../assets/icon-7797704_640.png";
// import axios from "axios";

// const TeacherCard = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const teachersPerPage = 6; // Show 6 teachers per page

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setError("You are not logged in or token is missing.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:5000/api/teachers", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log("API teachers response 👉", res.data);
//         setTeachers(res.data);
//       } catch (err) {
//         console.error("Error fetching teachers:", err);
//         if (err.response?.status === 403) {
//           setError("Access denied: You do not have permission to view teachers.");
//         } else {
//           setError("Something went wrong while fetching teachers.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   const filteredTeachers = teachers.filter((t) =>
//     t.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);
//   const startIndex = (currentPage - 1) * teachersPerPage;
//   const endIndex = startIndex + teachersPerPage;
//   const currentTeachers = filteredTeachers.slice(startIndex, endIndex);

//   // Reset to page 1 when search changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search]);

//   return (
//     <div className="min-h-screen bg-gray-50">
      
//       <section className="relative max-w-4xl mx-auto p-6 pt-12">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-3">
//             Our Teachers
//           </h1>
//           <p className="text-gray-600 text-lg">Discover and connect with our talented educators</p>
//         </div>

//         {/* Search Box */}
//         <div className="relative mb-8 max-w-md mx-auto">
//           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//             <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//           <input
//             type="text"
//             placeholder="Search for teachers..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-gray-700"
//           />
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex justify-center items-center py-16">
//             <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
//           </div>
//         )}

//         {/* Error message */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 backdrop-blur-sm">
//             <div className="flex items-center">
//               <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <p className="text-red-700 font-medium">{error}</p>
//             </div>
//           </div>
//         )}

//         {/* Teacher Cards */}
//         <div className="grid gap-6 md:gap-8">
//           {currentTeachers.length > 0 ? (
//             currentTeachers.map((teacher, index) => (
//               <div
//                 key={teacher.teacher_id}
//                 className="group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
//               >
//                 {/* Gradient Border Effect */}
                
//                 <div className="flex items-center gap-6">
//                   {/* Profile Image */}
//                   <div className="relative">
//                     <img
//                       className="relative w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
//                       src={ProfileImage}
//                       alt="Teacher Profile"
//                     />
//                     <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
//                   </div>

//                   {/* Info Section */}
//                   <div className="flex-1 min-w-0">
//                     <h2 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 truncate">
//                       {teacher.name}
//                     </h2>
                    
//                     <div className="flex items-center gap-2 mt-2">
//                       <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                       <p className="text-gray-500 text-sm truncate">{teacher.email}</p>
//                     </div>

//                     <div className="flex items-center gap-2 mt-2">
//                       <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                       </svg>
//                       <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
//                         {teacher.subject_name}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Action Button */}
//                   <button className="relative px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
//                     <span className="relative z-10">View Profile</span>
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             !error && !loading && (
//               <div className="text-center py-16">
//                 <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
//                   <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">No teachers found</h3>
//                 <p className="text-gray-500">Try adjusting your search terms</p>
//               </div>
//             )
//           )}
//         </div>

//         {/* Pagination */}
//         {filteredTeachers.length > teachersPerPage && (
//           <div className="flex justify-center items-center mt-12 space-x-2">
//             {/* Previous Button */}
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
//                 currentPage === 1
//                   ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                   : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg'
//               }`}
//             >
//               Previous
//             </button>

//             {/* Page Numbers */}
//             <div className="flex space-x-1">
//               {[...Array(totalPages)].map((_, index) => {
//                 const pageNumber = index + 1;
//                 return (
//                   <button
//                     key={pageNumber}
//                     onClick={() => setCurrentPage(pageNumber)}
//                     className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
//                       currentPage === pageNumber
//                         ? 'bg-blue-600 text-white shadow-lg transform scale-110'
//                         : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg'
//                     }`}
//                   >
//                     {pageNumber}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Next Button */}
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
//                 currentPage === totalPages
//                   ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                   : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg'
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         )}

//         {/* Results Info */}
//         {filteredTeachers.length > 0 && (
//           <div className="text-center mt-6">
//             <p className="text-gray-500 text-sm">
//               Showing {startIndex + 1} to {Math.min(endIndex, filteredTeachers.length)} of {filteredTeachers.length} teachers
//             </p>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default TeacherCard;

import React, { useEffect, useState } from "react";
import ProfileImage from "../assets/icon-7797704_640.png";
import axios from "axios";

const TeacherCard = () => {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const teachersPerPage = 6; // Show 6 teachers per page
  
  const subjects = ["All", "Math", "Science", "English", "History", "Computer Science"];

  useEffect(() => {
    const fetchTeachers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in or token is missing.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/teachers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API teachers response 👉", res.data);
        setTeachers(res.data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
        if (err.response?.status === 403) {
          setError("Access denied: You do not have permission to view teachers.");
        } else {
          setError("Something went wrong while fetching teachers.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = selectedSubject === "All" || t.subject_name === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);
  const startIndex = (currentPage - 1) * teachersPerPage;
  const endIndex = startIndex + teachersPerPage;
  const currentTeachers = filteredTeachers.slice(startIndex, endIndex);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedSubject]);

  return (
    <div className="min-h-screen bg-gray-50">
      
      <section className="relative max-w-4xl mx-auto p-6 pt-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-3">
            Our Teachers
          </h1>
          <p className="text-gray-600 text-lg">Discover and connect with our talented educators</p>
        </div>

        {/* Search Box */}
        <div className="relative mb-8 max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for teachers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-gray-700"
          />
        </div>

        {/* Subject Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-3 p-2 bg-white rounded-2xl shadow-lg">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedSubject === subject
                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 backdrop-blur-sm">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Teacher Cards */}
        <div className="grid gap-6 md:gap-8">
          {currentTeachers.length > 0 ? (
            currentTeachers.map((teacher, index) => (
              <div
                key={teacher.teacher_id}
                className="group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-center gap-6">
                  {/* Profile Image */}
                  <div className="relative">
                    <img
                      className="relative w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                      src={ProfileImage}
                      alt="Teacher Profile"
                    />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 truncate">
                      {teacher.name}
                    </h2>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-500 text-sm truncate">{teacher.email}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {teacher.subject_name}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="relative px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <span className="relative z-10">View Profile</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            !error && !loading && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No teachers found</h3>
                <p className="text-gray-500">Try adjusting your search terms or filters</p>
              </div>
            )
          )}
        </div>

        {/* Pagination */}
        {filteredTeachers.length > teachersPerPage && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg'
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-1">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                      currentPage === pageNumber
                        ? 'bg-blue-600 text-white shadow-lg transform scale-110'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg'
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Results Info */}
        {filteredTeachers.length > 0 && (
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredTeachers.length)} of {filteredTeachers.length} teachers
              {selectedSubject !== "All" && ` in ${selectedSubject}`}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default TeacherCard;