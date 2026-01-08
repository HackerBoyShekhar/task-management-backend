const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

// middleware
const authMiddleware = require("./middleware/auth.middleware");

// protected test route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

// route mounts
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// root
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
