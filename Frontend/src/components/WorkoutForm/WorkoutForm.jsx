/** @format */

import React, { useState } from "react";
import { useWorkoutsContext } from "../../Hooks/UseWorkoutContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyField, setEmptyField] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, reps, load };

    const response = await fetch("http://localhost:4000/api/workout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workout),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyField(json.emptyField);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setReps("");
      setLoad("");
      setEmptyField([]);
      console.log("Workouts loaded successfully", json);
      dispatch({ type: "CREATE_WORKOUTS", payload: json });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl border border-gray-200 transform transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Add New Workout
      </h2>

      {error && (
        <p className="text-red-600 text-sm mb-4 text-center bg-red-100 p-3 rounded-lg border border-red-400">
          {error}
        </p>
      )}

      {/* Title Field */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-800 font-medium">
          Workout Name
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter workout name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-3 border ${
            emptyField.includes("title") ? "border-red-500" : "border-gray-300"
          } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50`}
        />
        {emptyField.includes("title") && (
          <p className="text-red-500 text-sm mt-1">Workout name is required.</p>
        )}
      </div>

      {/* Reps Field */}
      <div className="mb-4">
        <label htmlFor="reps" className="block text-gray-800 font-medium">
          Reps
        </label>
        <input
          type="number"
          id="reps"
          placeholder="Enter number of reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className={`w-full p-3 border ${
            emptyField.includes("reps") ? "border-red-500" : "border-gray-300"
          } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50`}
        />
        {emptyField.includes("reps") && (
          <p className="text-red-500 text-sm mt-1">Reps are required.</p>
        )}
      </div>

      {/* Load Field */}
      <div className="mb-6">
        <label htmlFor="load" className="block text-gray-800 font-medium">
          Load (kg)
        </label>
        <input
          type="number"
          id="load"
          placeholder="Enter load in kg"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className={`w-full p-3 border ${
            emptyField.includes("load") ? "border-red-500" : "border-gray-300"
          } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50`}
        />
        {emptyField.includes("load") && (
          <p className="text-red-500 text-sm mt-1">Load is required.</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg">
        Add Workout
      </button>
    </form>
  );
};

export default WorkoutForm;
