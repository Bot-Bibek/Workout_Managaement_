import React from "react";
import { motion } from "framer-motion"; // Import framer-motion
import { FaDumbbell } from "react-icons/fa"; // Import dumbbell icon
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center text-white"
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: "100% 50%" }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      }}
      style={{
        background: "linear-gradient(to right, #4F8EF7, #9B64D2)", // Gradient Background
        backgroundSize: "200% 200%",
      }}
    >
      <div className="text-center">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2,
            ease: "easeInOut",
          }}
        >
          Welcome to RepRoutine
        </motion.h1>
        <motion.p
          className="text-lg " // Reduced margin
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Your personal workout management system
        </motion.p>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <FaDumbbell className="text-6xl text-yellow-500" />
        </motion.div>
        <motion.p
          className="text-lg ont-semibold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          A complete MERN stack project for managing workout routines.
        </motion.p>
        <motion.p
          className="text-lg font-semibold mb-6" // Semi-bold text style
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Develop By Bibek Bot
        </motion.p>
        <motion.button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-yellow-500 text-gray-800 rounded-lg text-xl font-semibold hover:bg-yellow-600 transition-all duration-300" // Added margin-top (mt-4)
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FrontPage;
