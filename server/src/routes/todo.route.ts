import express from "express";
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller";
import { authMiddleware } from "../middleware/auth.middleware"; // Ensure you have this middleware for authentication


const router = express.Router();
router.get("/",authMiddleware, getTodos);
router.get("/:id",authMiddleware, getTodoById);
router.post("/",authMiddleware, createTodo);
router.put("/:id",authMiddleware, updateTodo);
router.delete("/:id",authMiddleware, deleteTodo);

export default router;
