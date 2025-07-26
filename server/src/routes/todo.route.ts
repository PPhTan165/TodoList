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

router.get("/",authMiddleware, getTodos);
router.get("/:id",authMiddleware, findTaskById);
router.post("/",authMiddleware, createTodo);
router.put("/:id",authMiddleware, updateTodo);
router.delete("/:id",authMiddleware, deleteTask);

export default router;
