import { Request, Response, NextFunction } from "express";
import * as UserModel from "../models/user.model";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  
  const { username, email,phone, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const existing = await UserModel.findUserByEmail(email);

  if (!email || !password || !username || !phone) {
    return res.status(400).json({ message: "Missing field" });
  }

  if (existing) {
    return res.status(400).json({ message: "Email already exist" });
  }
  try {
    await UserModel.createUser({username, email, phone, password: hashed});
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

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await UserModel.findUserByName(username);
  if (!user) return res.status(404).json({ message: "Not found User" });

  const isMatch = await UserModel.verifyPassword(password, user[0].password);
  if (!isMatch) return res.status(401).json({ message: "Wrong Password" });

  if (user[0].role_id === 1) {
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email, role: user[0].role_id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );
    return res.status(200).json({ token: token });

  } else if (user[0].role_id === 2) {
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email, role: user[0].role_id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );
    return res.status(200).json({ token: token });

  } else {
    return res.status(401).json({ message: "Không có quyền" });
  }
};
