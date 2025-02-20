import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa";
import { useSignup } from "../../Hooks/UseSignup";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signup(email, password);

      console.log("Signup Response:", response); // Debugging
      console.log("Error State:", error); // Debugging

      if (response) {
        // Check if response is successful
        toast.success("🎉 Signup Successful! Welcome aboard!", {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#4CAF50",
            color: "#fff",
            fontWeight: "bold",
            padding: "12px",
            borderRadius: "10px",
          },
          icon: "🚀",
        });

        // Clear input fields after successful signup
        setEmail("");
        setPassword("");
      } else if (error) {
        // Display error if there is any
        toast.error(`❌ Signup Failed: ${error}`, {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#FF3D00",
            color: "#fff",
            fontWeight: "bold",
            padding: "12px",
            borderRadius: "10px",
          },
          icon: "⚠️",
        });
      }
    } catch (err) {
      console.error("Signup Error:", err);
      toast.error("❌ Something went wrong!", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#FF3D00",
          color: "#fff",
          fontWeight: "bold",
          padding: "12px",
          borderRadius: "10px",
        },
        icon: "⚠️",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full sm:w-96"
      >
        <div className="flex justify-center mb-6">
          <FaDumbbell className="text-5xl text-blue-600" /> {/* React logo */}
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all text-lg"
          >
            {isLoading ? "Creating..." : "Sign Up"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
