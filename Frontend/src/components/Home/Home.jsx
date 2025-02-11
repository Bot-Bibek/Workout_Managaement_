/** @format */

import React, { useEffect } from "react";
import { useWorkoutsContext } from "../../Hooks/UseWorkoutContext";
import WorkoutDetails from "../../Components/WorkoutDetails/WorkoutDetails";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/workout");
        const json = await response.json();
        console.log("Fetched workouts:", json); // Debugging log

        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: json });
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          Your Workouts
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Workout Details */}
          <div className="flex-1 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {workouts &&
              workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
              ))}
          </div>

          {/* Right Side: Improved Workout Form Design */}
          <div className="w-full lg:w-1/3">
            <WorkoutForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
