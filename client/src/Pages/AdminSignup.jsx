// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // export default function AdminSignup() {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     accessCode: "",
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

    
// //     console.log("Submitting Admin Data:", formData);

    
// //     navigate("/login");
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
// //       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
       
// //         <div className="text-center">
// //           <h2 className="text-2xl font-bold text-gray-800">Admin Signup</h2>
// //           <p className="text-gray-500 text-sm">Create your EduSched admin account</p>
// //         </div>

       
// //         <form className="space-y-4" onSubmit={handleSubmit}>
// //           <div>
// //             <label className="block text-gray-700 mb-1">Full Name</label>
// //             <input
// //               type="text"
// //               name="name"
// //               placeholder="Enter your full name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               required
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-gray-700 mb-1">Email</label>
// //             <input
// //               type="email"
// //               name="email"
// //               placeholder="Enter your email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               required
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-gray-700 mb-1">Password</label>
// //             <input
// //               type="password"
// //               name="password"
// //               placeholder="Create a password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               required
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-gray-700 mb-1">Admin Access Code</label>
// //             <input
// //               type="password"
// //               name="accessCode"
// //               placeholder="Enter secret access code"
// //               value={formData.accessCode}
// //               onChange={handleChange}
// //               required
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
// //           >
// //             Sign Up as Admin
// //           </button>
// //         </form>

       
// //         <p className="text-center text-sm text-gray-600">
// //           Already have an account?{" "}
// //           <span
// //             className="text-blue-600 font-medium cursor-pointer hover:underline"
// //             onClick={() => navigate("/")}
// //           >
// //             Login
// //           </span>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function AdminSignup() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     password: "",
//     access_code: "", // ✅ match backend
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/admin-signup", formData);

//       if (res.data.success) {
//         alert("Admin signup successful!");
//         navigate("/"); // redirect to login
//       } else {
//         alert(res.data.message || "Signup failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error signing up");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800">Admin Signup</h2>
//           <p className="text-gray-500 text-sm">Create your EduSched admin account</p>
//         </div>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="full_name"
//             placeholder="Full Name"
//             value={formData.full_name}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//           <input
//             type="password"
//             name="access_code"
//             placeholder="Admin Access Code"
//             value={formData.access_code}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//           <button
//             type="submit"
//             className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    access_code: "", // ✅ match backend
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/admin-signup", formData);

      if (res.data.success) {
        alert("Admin signup successful!");
        navigate("/"); // redirect to login
      } else {
        alert(res.data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error signing up");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 border border-gray-100">
          {/* Header with Icon */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-3 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Admin Signup</h2>
            <p className="text-gray-500 text-sm">Create your EduSched admin account</p>
          </div>

          {/* Enhanced Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter your full name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Admin Access Code Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Admin Access Code</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="access_code"
                  placeholder="Enter secret access code"
                  value={formData.access_code}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3.5 rounded-xl hover:from-gray-900 hover:to-black transition duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-6"
            >
              Create Admin Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Already registered?</span>
            </div>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-sm">
            <span className="text-gray-600">Have an account? </span>
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 hover:underline transition"
              onClick={() => navigate("/")}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
