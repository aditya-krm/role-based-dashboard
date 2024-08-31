import express from "express";
import { protectRoute } from "../middlewares/protectedRoutes.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Admin Dashboard
router.get("/admin", protectRoute, roleMiddleware("admin"), (req, res) => {
  res.send("Admin");
});

// Manager Dashboard
router.get("/manager", protectRoute, roleMiddleware("manager"), (req, res) => {
  res.send("Manager");
});

// User Dashboard
router.get("/user", protectRoute, roleMiddleware("user"), (req, res) => {
  res.send("User");
});

export default router;
