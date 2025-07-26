import { Request, Response } from "express";
import * as taskModel from "../models/task.model";

export const getTodos = async (req: Request, res: Response): Promise<any> => {
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const tasks = taskModel.getTasks(user_id);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Database err" });
  }
};

export const findTaskById = (req: Request, res: Response) => {
  const { id } = req.params;
  const goalId = req.goal?.id;
  if (!goalId) {
    res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const task = taskModel.getTaskById(Number(id), goalId);
  } catch (error) {}
};

export const findTaskByUserId = (req: Request, res: Response) => {
  const userId = req.user?.id;
  const goalId = req.goal?.id;

  if (!userId || !goalId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const result = taskModel.getTaskById(goalId, userId);
    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Database error" });
  }
};

export const createTodo = async (req: Request, res: Response): Promise<any> => {
  const { title, note, start_at, due_at } = req.body;
  const userId = req.user?.id;
  const goalId = req.goal?.id;
  if (!userId || !goalId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    await taskModel.createTask({
      title,
      note,
      start_at,
      due_at,
      goal_id: goalId,
      assignee_id: userId,
    });
    return res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Database query failed" });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<any> => {
  const { title, note, start_at, due_at, status } = req.body;
  const { id } = req.params;
  const user_id = req.user?.id;
  const goalId = req.goal?.id;
  if (!user_id) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    await taskModel.updateTask(
      {
        title,
        note,
        start_at,
        due_at,
        status,
        goal_id: goalId,
        assignee_id: user_id,
      },
      Number(id),
      goalId
    );
    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Database query failed" });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const goalId = req.goal?.id;
  const userId = req.user?.id;

  if (!goalId || !userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    if (!taskModel.isAdminGoalMember(userId, goalId)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await taskModel.deleteTask(Number(id), goalId);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Database query failed" });
  }
};
