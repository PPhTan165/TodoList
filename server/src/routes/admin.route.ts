import express from "express";
import { getUser, getUserById } from "../controllers/admin.controller";
import { authMiddleware } from "../middleware/auth.middleware"; // Ensure you have this middleware for authentication

const router = express.Router();

router.get('/user',authMiddleware,getUser)
router.get('/user/:id',authMiddleware,getUserById);
export default router;
