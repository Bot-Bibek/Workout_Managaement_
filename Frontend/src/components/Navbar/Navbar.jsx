import React from "react";
import { Link } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLogout } from "../../Hooks/UseLogout";
import { useAuthContext } from "../../Hooks/UseAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  const getEmailInitials = () => {
    if (user && user.user) {
      const name = user.user.email.split("@")[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return "";
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <motion.div
        className="container mx-auto flex items-center justify-between py-4 px-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3 group">
          <FaDumbbell className="text-blue-600 text-4xl drop-shadow-lg group-hover:scale-110 transition-transform" />

          <h1 className="text-gray-900 text-2xl font-semibold tracking-wide group-hover:text-blue-600 transition-all">
            RepRoutine
          </h1>
        </Link>

        {/* User Info or Auth Links */}
        {user ? (
          <motion.div
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-white text-lg font-medium bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 rounded-full shadow-md">
              {getEmailInitials(user.user?.email)}
            </span>
            <motion.button
              className="px-5 py-2 text-white bg-red-500 rounded-lg shadow-md transition-all duration-300 hover:bg-red-600 hover:scale-105 active:scale-95"
              onClick={handleClick}
              whileTap={{ scale: 0.9 }}
            >
              Logout
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Login/Register links with icons */}
            <Link
              to="/login"
              className="flex items-center space-x-2 text-gray-700 font-medium hover:text-blue-600 transition-all"
            >
              <FaSignInAlt className="text-xl" />
              <span>Login</span>
            </Link>
            <Link
              to="/signup"
              className="flex items-center space-x-2 text-gray-700 font-medium hover:text-blue-600 transition-all"
            >
              <FaUserPlus className="text-xl" />
              <span>Signup</span>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </header>
  );
};

export default Navbar;
