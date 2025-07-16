import { db } from "../models/db"; // Import the database connection
import { Request, Response, NextFunction } from "express";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  const role_id = 1;
  const hashed = await bcrypt.hash(password, 10);
  
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
  }

  db.query(
    "INSERT INTO users (email, password, role_id) VALUES (?, ?, ?)",
    [email, hashed, role_id],
    (error: any, results: any) => {

      if (error)
        return res.status(500).json({ error: "Database query failed" });
      if (results.affectedRows > 0) {
        res.status(201).json({ message: "User registered successfully" });
      } else {
        res.status(400).json({ message: "Failed to register user" });
      }
    }
  );
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ? ",
    [email],
    async (error: any, results: any) => {

      if (error)
        return res.status(500).json({ error: "Database query failed" });

      if (results.length > 0) {
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
          return res.status(401).json({ message: "Wrong Password" });

        if (user.role_id === 1) {
          const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role_id },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "1h" }
          );
          return res.status(200).json({ token: token });

        } else if (user.role_id === 2) {
          const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role_id },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "1h" }
          );
          return res.status(200).json({ token: token });
        } else {
          return res.status(401).json({ message: "Không có quyền" });
        }
      }
    }
  );
};
