import { useNavigate } from "react-router-dom";

export default function SignupSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg text-center space-y-8">

        <div>
          <h1 className="">School project</h1>
          <h1 className="text-2xl font-bold text-gray-800">Welcome to EduSched</h1>
          <p className="text-gray-500 text-sm mt-1">Select your role to sign up</p>
        </div>

      
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/signup/teacher-signup")}
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
          >
            👨‍🏫 Sign Up as Teacher
          </button>
          <button
            onClick={() => navigate("/signup/admin-signup")}
            className="w-full bg-gray-800 text-white py-3 rounded-xl text-lg font-medium hover:bg-gray-900 transition"
          >
            🛡️ Sign Up as Admin
          </button>
        </div>
      </div>
    </div>
  );
}
