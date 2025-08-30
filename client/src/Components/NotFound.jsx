import React from 'react';
import { useNavigate } from 'react-router-dom';
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-300"
            />
          ))}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 text-center max-w-2xl">
        
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-light text-gray-800 tracking-tight">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-700">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={()=>{navigate('/')}} className="px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            Return Home
          </button>
          
          <button onClick={()=>{navigate('/')}} className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            Go Back
          </button>
        </div>

        {/* Additional Help Text */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If you believe this is an error, please contact our support team.
          </p>
        </div>
      </div>

      {/* Minimal Decorative Element */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gray-400 rounded-full opacity-40"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;