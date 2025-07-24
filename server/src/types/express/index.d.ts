import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role_id: number;
      },

      goal?: {
        id: number;
        title: string;
        description?: string;
        owner_id: number;
      }
  
    }
  }
}
