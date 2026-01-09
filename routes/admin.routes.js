const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const allowRoles = require("../middleware/role.middleware");

const {
  getAllTasks,
  getAllUsers,
} = require("../controllers/admin.controller");

router.get(
  "/tasks",
  authMiddleware,
  allowRoles("admin", "manager"),
  getAllTasks
);

router.get(
  "/users",
  authMiddleware,
  allowRoles("admin"),
  getAllUsers
);

module.exports = router;
