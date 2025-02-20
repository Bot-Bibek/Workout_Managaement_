/** @format */

import "react";
import { Link } from "react-router-dom";
import { GiMuscleUp } from "react-icons/gi"; // Workout icon from react-icons

const Navbar = () => {
  return (
    <header className="bg-gray-900 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/login" className="flex items-center space-x-3 group">
          <GiMuscleUp className="text-yellow-500 text-5xl transition-transform group-hover:scale-110" />
          <h1 className="text-white text-3xl font-bold tracking-wider group-hover:text-yellow-400 transition-colors">
            Workout
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
