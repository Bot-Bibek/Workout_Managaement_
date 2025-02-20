require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts.routes");
const userRoutes = require("./routes/user.routes");

//express application
const app = express();

app.use(cors());

//middleware
app.use(express.json());

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);

//connect to db

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("Connected to db & Server running on port", process.env.PORT)
    );
  })
  .catch((err) => console.error(err));
