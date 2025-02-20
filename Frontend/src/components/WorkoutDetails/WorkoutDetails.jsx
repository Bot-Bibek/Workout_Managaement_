import React from "react";
import { FaDumbbell, FaCalendarAlt } from "react-icons/fa";
import { MdFitnessCenter, MdDelete } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { useWorkoutsContext } from "../../Hooks/UseWorkoutContext";
import { useAuthContext } from "../../Hooks/UseAuthContext";
import { toast } from "react-toastify";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      toast.error("You must be logged in to delete workouts.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    try {
      const response = await fetch(
        "https://workout-buddy-beryl.vercel.app/api/workouts/" + workout._id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete workout.");
      }

      dispatch({ type: "DELETE_WORKOUT", payload: { _id: workout._id } });

      toast.success("Workout deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Failed to delete workout. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  const formattedDate = new Date(workout.createdAt).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 border border-gray-200 relative">
      {/* Delete Icon */}
      <span
        className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-red-600 transition duration-200"
        onClick={handleClick}
      >
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
