const express = require("express");
const router = express.Router();

const {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
  getTaskStats
} = require("../controllers/task.controller");

const authMiddleware = require("../middleware/auth.middleware");

// 🔥 FIXED ORDER (static routes first)
router.get("/stats", authMiddleware, getTaskStats);

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getMyTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
