import React from "react";
import { useHistory } from "react-router-dom"; // You can use 'useNavigate' in React Router v6

const FrontPage = () => {
  const history = useHistory(); // For React Router v5
  // For React Router v6, use const navigate = useNavigate();

  const handleGetStarted = () => {
    history.push("Signup"); // Redirect to the login page (for React Router v5)
    // For React Router v6: navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to FitTrack</h1>
        <p className="text-lg mb-6">Your personal workout management system</p>
        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-yellow-500 text-gray-800 rounded-lg text-xl font-semibold hover:bg-yellow-600 transition-all duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default FrontPage;
