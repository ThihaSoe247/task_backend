require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const cookieParse = require("cookie-parser");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();

// ✅ Use process.env here
const PORT = process.env.PORT || 4000;
const mongoURL = process.env.MONGO_URL;

// Connect to DB
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  })
  .catch((err) => console.error("MongoDB error:", err));

// Middleware
const allowedOrigins = [
  "http://localhost:5173", // development
  "https://task-frontend-7jn9mw54s-thiha-soes-projects-42b1b68e.vercel.app", // production
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // VERY important to allow cookies
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  return res.json({ hello: "World" });
});

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
