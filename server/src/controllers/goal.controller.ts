import { Request, Response } from "express";
import * as goalModel from "../models/goal.model";

export const getGoals = (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ message: "Authorized" });

  try {
    const results = goalModel.getGoals(userId);
    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getGoalById = (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ message: "Authorized" });

  try {
    const goal = goalModel.getHGoalById(Number(id), userId);
    return res.status(200).json({ goal });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const createGoal = async (res: Response, req: Request) => {
  const { title, description, owner_id } = req.body;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Authorized" });

  try {
   const goalId = await goalModel.createGoal({ title, description, owner_id: userId });

   if(!goalId) { 
      return res.status(500).json({ message: "Failed to create goal" });
   }
   else {
      await goalModel.addUserToGoal(goalId, userId);
      return res.status(201).json({ message: "Goal created successfully" });
   }

  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const updateGoal = async (res: Response, req: Request) => {
  const { title, description, owner_id } = req.body;
  const { id } = req.params;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Authorized" });
  try {
    const result = await goalModel.updateGoal(
     { title, description, owner_id },
      Number(id),
      userId
    );
    return res.status(200).json({ message: "Goal updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
