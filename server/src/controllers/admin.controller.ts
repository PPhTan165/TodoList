import { Request, Response } from "express";
import * as UserModel from "../models/user.model";

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const role = req.user?.role_id;
  const user_id = req.user?.id;

  if (!user_id) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (role !== 2) {
    res.status(401).json({ message: "Unauthorized Admin" });
  }

  try {
    const users = await UserModel.getAllUser();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "DB error" });
  }
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

  try {
    const user = await UserModel.getUserById(Number(id));
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "DB error" });
  }
};
