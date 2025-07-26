import { db } from "../config/db";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";

export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  password: string;
  role_id: number;
}


export const getAllUser = async (): Promise<User[]> => {
  const sql = "SELECT * FROM users WHERE role_id = ?";
  const [rows]: any =await  db.query<User[] & RowDataPacket[]>(sql, [1]);
  return rows;
};

export const getUserById = async (id: number): Promise<User[]> => {
  const sql = "SELECT * FROM users WHERE id = ?";
  const [rows]: any =await  db.query<User[] & RowDataPacket[]>(sql, [id]);
  return rows;
};

export const findUserByEmail = async (email: string): Promise<User[]> => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const [rows]: any =await  db.query<User[] & RowDataPacket[]>(sql, [email]);
  return rows[0] || null;
};

export const findUserByName = async (name: string): Promise<User[]> => {
  const sql = "SELECT * FROM users WHERE username = ?";
  const [rows]: any =await  db.query<User[] & RowDataPacket[]>(sql, [name]);
  return rows;
};

export const createUser = async (
user: Omit<User, "id" | "role_id">,

): Promise<void> => {
  const sql = `
    INSERT INTO users (username, email, phone, password, role_id) 
    VALUES (?, ?, ?, ?, ?)
  `;
  const { username, email, phone, password } = user;
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query(sql, [
    username,
    email,
    phone,
    hashedPassword,
    1,
  ]);
};

export const verifyPassword = (plain: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(plain, hashed);
};

