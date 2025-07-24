import { Request, Response } from "express";
import * as goalModel from "../models/goal.model";

export const getGoals = (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ message: "Authorized" });

  try {
    const goals = goalModel.getGoals(userId);
    return res.status(200).json({ goals });
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
  const { title, description } = req.body;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Authorized" });

  try {
   const result = await goalModel.createGoal(title, description, userId);
   if(result.affectedRows > 0){ 
        const group = await goalModel.createGoalMembers(result.insertId, userId);
        return res.status(201).json({
            message: "Goal created",
            goal: {
                id: result.insertId,
                title,
                description,
                owner_id: userId
            }
        });
   }
  } catch (error) {
    return res.status(500).json({message: error})
  }
};

export const updateGoal = async (res: Response, req: Request) => {
    const {title, description} = req.body;
    const { id} = req.params
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Authorized" });
    try {
        const result = await goalModel.updateGoal(Number(id), title, description, userId);
        if(result.affectedRows > 0){
            return res.status(200).json({
                message: "Goal updated"
            })
        }
    } catch (error) {
        return res.status(500).json({message: error})
    }
}
