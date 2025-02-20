import React, { useEffect, useState } from "react";
import { useWorkoutsContext } from "../../Hooks/UseWorkoutContext";
import { useAuthContext } from "../../Hooks/UseAuthContext";
import WorkoutDetails from "../../Components/WorkoutDetails/WorkoutDetails";
import WorkoutForm from "../../Components/WorkoutForm/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          "https://workout-buddy-beryl.vercel.app/api/workouts",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();
        console.log("Fetched workouts:", json); // Debugging log

        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: json });
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Your Workouts
        </h1>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side: Workout Details */}
          <div className="flex-1 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {workouts &&
              workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
              ))}
          </div>

          {/* Right Side: Workout Form */}
          <div className="w-full lg:w-1/3">
            <WorkoutForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
