import { Request, Response } from "express";
import { db } from "../models/db"; // Import the database connection

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const role = req.user?.role;
  const user_id = req.user?.id;
  console.log(role);

  if (!user_id) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (role !== 2) {
    res.status(401).json({ message: "Unauthorized Admin" });
  }

  db.query(
    "SELECT id, email FROM users WHERE role_id = ?",
    [1],
    (err: any, results: any) => {
      if (err) {
        res.status(500).json({ error: "Database query failed" });
        return;
      }
      res.json(results);
    }
  );
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const role = req.user?.role;
  const user_id = req.user?.id;

  if (!user_id) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (role !== 2) {
    res.status(401).json({ message: "Unauthorized Admin" });
  }

  db.query(
    "SELECT id, email FROM users WHERE id = ? AND role_id = ?",
    [id, 1],
    (err: any, results: any) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(401).json({ message: "No user exits" });
      }
    }
  );
};
