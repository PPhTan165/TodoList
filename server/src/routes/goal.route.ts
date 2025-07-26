import express from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { createGoals, findGoalById, getAllGoals, updateGoals, deleteGoalById } from "../controllers/goal.controller";

const router = express.Router();


router.get("/",authMiddleware, getAllGoals);
router.get("/:id",authMiddleware, findGoalById);
router.post("/",authMiddleware, createGoals);
router.put("/:id",authMiddleware, updateGoals);
router.delete('/:id', authMiddleware, deleteGoalById)

export default router;