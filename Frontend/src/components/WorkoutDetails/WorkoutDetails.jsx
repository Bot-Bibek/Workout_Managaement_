/** @format */

import React from "react";
import { FaDumbbell, FaCalendarAlt } from "react-icons/fa"; // Icons for load and date
import { MdFitnessCenter, MdDelete } from "react-icons/md"; // Icons for workout name and delete
import { BiDetail } from "react-icons/bi"; // Icon for description
import { useWorkoutsContext } from "../../Hooks/UseWorkoutContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch(
      "http://localhost:4000/api/workout/" + workout._id,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    dispatch({ type: "DELETE_WORKOUT", payload: { _id: workout._id } });
  };

  // Format the date
  const formattedDate = new Date(workout.createdAt).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 border border-gray-200">
      {/* Delete Icon */}
      <span
        className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-red-600 transition duration-200"
        onClick={handleClick}>
        <MdDelete className="text-xl" />
      </span>

      {/* Workout Name */}
      <div className="flex items-center space-x-4 mb-6">
        <MdFitnessCenter className="text-blue-600 text-4xl" />
        <h1 className="text-gray-900 text-3xl font-bold tracking-wide">
          {workout.title}
        </h1>
      </div>

      {/* Workout Description */}
      <div className="flex items-center space-x-4 mb-4">
        <BiDetail className="text-blue-500 text-2xl" />
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Reps:</span> {workout.reps}
        </p>
      </div>

      {/* Workout Load */}
      <div className="flex items-center space-x-4 mb-4">
        <FaDumbbell className="text-green-600 text-2xl" />
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Load:</span> {workout.load} kg
        </p>
      </div>

      {/* Created At */}
      <div className="flex items-center space-x-4">
        <FaCalendarAlt className="text-yellow-500 text-2xl" />
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Created At:</span> {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default WorkoutDetails;
