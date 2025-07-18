import { Request, Response, NextFunction } from "express";
import * as UserModel from "../models/user.model";
import { exit } from "process";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const existing = await UserModel.findUserByEmail(email);

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Name, Email and password are required" });
  }

  if (existing) {
    return res.status(400).json({ message: "Email already exist" });
  }
  try {
    await UserModel.createUser(name, email, hashed);
    return res.status(200).json({ message: "User registered" });

  } catch (error) {
    return res.status(500).json({ error: "Database query failed" });
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await UserModel.findUserByEmail(email);
  if (!user) return res.status(404).json({ message: "Not found User" });

  const isMatch = await UserModel.verifyPassword(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Wrong Password" });

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
};
