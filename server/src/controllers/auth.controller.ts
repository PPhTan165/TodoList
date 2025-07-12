import { db } from "../models/db"; // Import the database connection
import { Request, Response, NextFunction, RequestHandler } from "express";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const register  = async ( req: Request,res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  if (!email || !password) {
     res.status(400).json({ message: "Email and password are required" });
  }

  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashed],
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
     res.status(400).json({ message: "Email and password are required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (error: any, results: any) => {
      if (error)
        return res.status(500).json({ error: "Database query failed" });

      if (results.length > 0) {
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "1h" }
          );
          return res.status(200).json({ token });
        } else {
          return res.status(401).json({ message: "Invalid credentials" });
        }
      }
    }
  );
};
