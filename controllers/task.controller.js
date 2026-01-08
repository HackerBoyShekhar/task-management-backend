const Task = require("../models/task.model");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      status: req.body.status || "pending",
      user: req.user._id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY TASKS
const getMyTasks = async (req, res) => {
  try {
    const filter = { user: req.user._id };

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTaskStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({
      user: userId,
      status: "completed"
    });
    const pendingTasks = await Task.countDocuments({
      user: userId,
      status: "pending"
    });

    const completionRate =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch task stats" });
  }
};
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({
      user: userId,
      status: "completed",
    });
    const pendingTasks = await Task.countDocuments({
      user: userId,
      status: "pending",
    });

    const completionRate =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const recentTasks = await Task.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
      recentTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};


// 🔥 MOST IMPORTANT PART
module.exports = {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
  getTaskStats,
};
