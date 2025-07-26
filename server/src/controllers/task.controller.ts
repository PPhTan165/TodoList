import { Request, Response } from "express";
import * as taskModel from "../models/task.model";
import { isAdminGoalMember } from "../models/goal.model";
export const getTodos = async (req: Request, res: Response): Promise<any> => {
  const goalId = parseInt(req.params.goalId, 10);

  try {
    const tasks = await taskModel.getTasks(goalId);
    res.status(200).json({ data: tasks });
  } catch (error) {
    res.status(500).json({ message: "Database err" });
  }
};

export const findTaskById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const  taskId  =Number( req.params.taskId);
  const goalId = Number(req.params.goalId);
  if (!goalId) {
    res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const task = await taskModel.getTaskById(taskId, goalId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ message: "Database error" });
  }
};

export const findTaskByUserId = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const goalId = Number(req.params.goalId);

  if (!userId || !goalId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const result = await taskModel.getTaskById(goalId, userId);
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
  const userId = parseInt(req.user?.id, 10)
  const goalId = parseInt(req.params.goalId,10);
  console.log("goalId:", goalId, "userId:", userId);

  const isAdmin = await isAdminGoalMember(userId, goalId);
  console.log("isAdmin:", isAdmin);

  if(isAdmin) { 
    return res.status(403).json({ message: "Authorization" });
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
  const  taskId  =Number( req.params.taskId);
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
      taskId,
      goalId
    );
    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Database query failed" });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
  const  taskId  =Number( req.params.taskId);
  const goalId = req.goal?.id;
  const userId = req.user?.id;

  if (!goalId || !userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    if (!isAdminGoalMember(userId, goalId)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await taskModel.deleteTask(taskId, goalId);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Database query failed" });
  }
};
