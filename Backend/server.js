/** @format */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRouter = require("./routes/workouts.routes");
const userRoutes = require("./routes/user.routes");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/workout", workoutRouter);

app.use("/api/users", userRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(
        "Database is connected and server is on ",
        process.env.PORT,
        "Port"
      )
    );
  })
  .catch((err) => console.error(err));
