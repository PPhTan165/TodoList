import { db } from "../config/db";
import bcrypt from "bcrypt";

export const getAllUser = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE role_id = ?",
      [1],
      (err: any, results: any) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

export const getUserById = (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE id = ? AND role_id = ?",
      [id, 1],
      (err: any, results: any) => {
        if (err) return reject(err);
        resolve(results[0]);
      }
    );
  });
};

export const findUserByEmail = (email: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err: any, results: any) => {
        if (err) return reject(err);
        resolve(results[0]);
      }
    );
  });
};

export const findUserByName = (name: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE name = ?",
      [name],
      (err: any, results: any) => {
        if (err) return reject(err);
        resolve(results[0]);
      }
    );
  });
};

export const createUser = (
  name: string,
  email: string,
  hashedPassword: string,
  roleId = 1
): Promise<any> => {
  return new Promise((resolve, rejects) => {
    db.query(
      "INSERT INTO users (name, email, password, role_id) VALUE (?,?,?,?)",
      [name, email, hashedPassword, roleId],
      (err: any, results: any) => {
        if (err) return rejects(err);
        resolve(results);
      }
    );
  });
};



export const verifyPassword = (plain: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(plain, hashed);
};