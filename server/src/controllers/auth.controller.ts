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
  const existing: any = await  UserModel.findUserByEmail(email);

  if (!email || !password || !username || !phone) {
    return res.status(400).json({ message: "Missing field" });
  }

  if (existing) {
    console.log(existing);
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
  const users = await UserModel.findUserByName(username);
  const user = users[0];
  if (!users) return res.status(404).json({ message: "Not found User" });

  const isMatch =  UserModel.verifyPassword(password, user.password);
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
