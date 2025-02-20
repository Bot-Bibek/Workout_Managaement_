import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./Hooks/UseAuthContext";
import { Toaster } from "react-hot-toast"; // ✅ Import Toaster
import Home from "./Routes/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Routes/Login/Login";
import Signup from "./Routes/Signup/Signup";
import FrontPage from "./Routes/FrontPage/FrontPage"; // Import the FrontPage component

const App = () => {
  const { user, loading } = useAuthContext(); // Ensure loading state is handled

  if (loading) {
    return <div>Loading...</div>; // Prevent unnecessary redirects before user is loaded
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: user ? <Home /> : <Navigate to="/frontpage" />,
        },
        {
          path: "/frontpage", // FrontPage route
          element: !user ? <FrontPage /> : <Navigate to="/" />,
        },
        {
          path: "/login",
          element: !user ? <Login /> : <Navigate to="/" />,
        },
        {
          path: "/signup",
          element: !user ? <Signup /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />{" "}
      {/* ✅ Toaster added */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
