import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include 'user'
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Authorization header is missing" });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token is missing" });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    res.status(500).json({ message: "JWT_SECRET not defined" });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

