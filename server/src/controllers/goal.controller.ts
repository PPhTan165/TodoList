import { Request, Response } from "express";
import * as goalModel from "../models/goal.model";

export const getAllGoals = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Authorized" });
    return; // Stop execution
  }
  try {
    const results = await goalModel.getGoals(userId);
    res.status(200).json({ 
      success: true,
      message: "Goals retrieved successfully",
      data: results 
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const findGoalById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Authorized" });
    return;
  }
  try {
    const goal = await goalModel.getHGoalById(Number(id), userId);
    res.status(200).json({ data: goal });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createGoals = async (req: Request, res: Response): Promise<void> => {
  const { title, description } = req.body;
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Authorized" });
    return;
  }
  try {
    const goalId = await goalModel.createGoal({
      title,
      description,
      owner_id: userId,
    });
    if (!goalId) {
      res.status(500).json({ message: "Failed to create goal" });
      return;
    }
    await goalModel.addUserToGoal(goalId, userId);
    res.status(201).json({ message: "Goal created successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateGoals = async (req: Request, res: Response): Promise<void> => {
  const { title, description, owner_id } = req.body;
  const { id } = req.params;
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Authorized" });
    return;
  }
  try {
    await goalModel.updateGoal(
      { title, description, owner_id },
      Number(id),
      userId
    );
    res.status(200).json({ message: "Goal updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteGoalById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Authorized" });
    return;
  }
  try {
    await goalModel.deleteGoal(Number(id), userId);
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};