import { db } from "../config/db";
import { RowDataPacket } from "mysql2";
export interface Task {
  title: string;
  note: string;
  start_at: Date;
  due_at: Date;
  status: string;
  goal_id: number;
  assignee_id: number;
}

export const getTasks = async (goalId: number): Promise<Task[]> => {
  const sql = "SELECT * FROM tasks WHERE goal_id = ?";
  const [rows]: any = await db.query<Task[] & RowDataPacket[]>(sql, [goalId]);
  return rows;
};

export const getTasksByUserId = async (
  goalId: number,
  userId: number
): Promise<Task[]> => {
  const sql = "SELECT * FROM tasks WHERE goal_id = ? AND assignee_id = ?";
  const [rows]: any = await db.query<Task[] & RowDataPacket[]>(sql, [
    goalId,
    userId,
  ]);
  return rows;
};

export const getTaskById = async (
  id: number,
  goalId: number
): Promise<Task[]> => {
  const sql = "SELECT * FROM tasks WHERE id = ? AND goal_id = ?";
  const [rows]: any = await db.query<Task[] & RowDataPacket[]>(sql, [
    id,
    goalId,
  ]);
  return rows;
};

export const createTask = async (
  task: Omit<Task, "id" | "status">
): Promise<void> => {
  const sql = `
    INSERT INTO tasks 
    (title, note, start_at, due_at, goal_id, assignee_id) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const { title, note, start_at, due_at, goal_id, assignee_id } = task;
  await db.query(sql, [
    title,
    note,
    start_at,
    due_at,
    goal_id,
    assignee_id,
  ]);
};

export const updateTask = async (
  task: Omit<Task, "id">,
  id: number,
  currentGoalId: number
): Promise<void> => {
  const sql = `UPDATE tasks 
  SET title = ?, note = ?, start_at = ?, due_at = ?, status = ?, goal_id = ?, assignee_id = ? 
  WHERE id = ? AND goal_id = ?`;
  const { title, note, start_at, due_at, status, goal_id, assignee_id } = task;
  await db.query(sql, [
    title,
    note,
    start_at,
    due_at,
    status,
    goal_id,
    assignee_id,
    id,
    currentGoalId,
  ]);
};

export const deleteTask = async (id: number, goalId: number): Promise<void> => {
  const sql = "DELETE FROM tasks WHERE id = ? AND goal_id = ?";
  await db.query(sql, [id, goalId]);
};

