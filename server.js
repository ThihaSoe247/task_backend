const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const mongoURL =
  "mongodb+srv://ThihaSoe:ggcp14122001@tasks.dca4nbn.mongodb.net/";

const PORT = process.env.PORT || 2000;

mongoose.connect(mongoURL).then(() => {
  console.log("MongoDB connected successfully");
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});

app.use(cors()); //local dev --WARNING--
app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json({ hello: "World" });
});

app.use("/api/tasks", taskRoutes);
