import express from "express";
import {
  getTodos,
  findTaskById,
  createTodo,
  updateTodo,
  deleteTask,
} from "../controllers/task.controller";
import { authMiddleware } from "../middleware/auth.middleware"; // Ensure you have this middleware for authentication



const router = express.Router();

router.get("/:goalId/",authMiddleware, getTodos);
router.get("/:goalId/task/:taskId",authMiddleware, findTaskById);
router.post("/:goalId/",authMiddleware, createTodo);
router.put("/:goalId/task/:taskId",authMiddleware, updateTodo);
router.delete("/:goalId/task/:taskId",authMiddleware, deleteTask);

export default router;
