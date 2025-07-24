import { Request, Response } from "express";
import { db } from "../config/db"; // Import the database connection
import * as taskModel from "../models/todo.model"
export const getTodos = async (req: Request, res: Response): Promise<any> => {
  const user_id = req.user?.id;
  
  if (!user_id) {
   return res.status(401).json({ message: "Unauthorized" });
  
  }
  try {
    const tasks = taskModel.getTasks(user_id)
    res.status(200).json({tasks});
  } catch (error) {
    res.status(500).json({message: "Database err"})
  }
  
};

export const getTodoById = (req: Request, res: Response)=> {
  const { id } = req.params;
  const goalId = req.goal?.id;
  if (!goalId) {
    res.status(401).json({ message: "Unauthorized" });
    
  }
  try {
    const task = taskModel.getTaskById(Number(id), goalId)
  } catch (error) {
    
  }
};

export const createTodo = (req: Request, res: Response) => {
  const { title } = req.body;
  const user_id = req.user?.id;
  if (!user_id) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  db.query(
    "INSERT INTO todos (title,user_id) VALUES (?,?)",
    [title, user_id],
    (error: any, results: any) => {
      if (error)
        return res.status(500).json({ error: "Database query failed" });
      if (results.affectedRows > 0) {
        res
          .status(201)
          .json({ id: results.insertId, title, completed: false, user_id });
      } else {
        res.status(400).json({ message: "Failed to create todo" });
      }
    }
  );
};

export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const user_id = req.user?.id;
  if (!user_id) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  db.query(
    "UPDATE todos SET title = ?, completed = ? WHERE id = ? AND user_id = ?",
    [title, completed, id, user_id],
    (error: any) => {
      if (error)
        return res.status(500).json({ error: "Database query failed" });
      res.status(200).json({ message: "Todo updated successfully" });
    }
  );
};

export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const user_id = req.user?.id;
  if (!user_id) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  db.query(
    "DELETE FROM todos WHERE id = ? AND user_id= ?",
    [id, user_id],
    (error: any, results: any) => {
      if (error)
        return res.status(500).json({ error: "Database query failed" });
      if (results.affectedRows > 0) {
        res.status(200).json({ message: "Todo deleted successfully" });
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    }
  );
};
