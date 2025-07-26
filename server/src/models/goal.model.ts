import { db } from "../config/db";
import { RowDataPacket } from "mysql2";

export interface Goal {
  id: number;
  title: string;
  description: string;
  owner_id: number;
}

export const getGoals = async (userId: number): Promise<Goal[]> => {
  const sql = "SELECT * FROM goals WHERE owner_id = ?";
  const [rows]: any = await db.query<Goal[] & RowDataPacket[]>(sql, [userId]);
  return rows;
};

export const getHGoalById = async (
  id: number,
  ownerId: number
): Promise<Goal[]> => {
  const sql = "SELECT * FROM goals WHERE id = ? AND owner_id = ?";
  const [rows]: any = await db.query<Goal[] & RowDataPacket[]>(sql, [
    id,
    ownerId,
  ]);
  return rows;
};

export const createGoal = async (goal: Omit<Goal, "id">): Promise<any> => {
  const sql = `
    INSERT INTO goals (title, description, owner_id) VALUES (?, ?, ?)`;
  const { title, description, owner_id } = goal;
  const [result]: any = await db.query(sql, [title, description, owner_id]);
  return result.insertId;
};

export const countMemberGoals = async (goalId: number): Promise<number> => {
  const sql = "SELECT COUNT(*) as count FROM goal_members WHERE goal_id = ?";
  const [rows]: any = await db.query<RowDataPacket[]>(sql, [goalId]);
  return rows[0].count;
};

export const addUserToGoal = async (
  goalId: number,
  userId: number
): Promise<void> => {
  const count_member = await countMemberGoals(goalId);

  const role = Number(count_member) == 0 ? "admin" : "member";
  console.log("count:" + count_member + " role: " + role);
  const sql = `
        INSERT INTO goal_members (goal_id, user_id, role) VALUES (?, ?, ?)`;
  await db.query(sql, [goalId, userId, role]);
};

export const updateGoal = async (
  goal: Omit<Goal, "id">,
  id: number,
  userId: number
): Promise<void> => {
  const sql = `
    UPDATE goals SET title = ?, description = ?, owner_id = ? WHERE id = ? and owner_id = ?`;
  const { title, description, owner_id } = goal;
  await db.query(sql, [title, description, owner_id, id, userId]);
};

export const deleteGoal = async (
  id: number,
  ownerId: number
): Promise<void> => {
  const sql = "DELETE FROM goals WHERE id = ? AND owner_id = ?";
  await db.query(sql, [id, ownerId]);
};

export const getGoalMembers = async (goalId: number): Promise<any> => {
  const sql = `
    SELECT gm.user_id, u.name, gm.role 
    FROM goal_members gm 
    JOIN users u ON gm.user_id = u.id 
    WHERE gm.goal_id = ?`;
  const [rows]: any = await db.query<RowDataPacket[]>(sql, [goalId]);
  return rows;
};

export const isGoalMember = async (
  userId: number,
  goalId: number
): Promise<boolean> => {
  const sql = "SELECT COUNT(*) as count FROM goal_members WHERE user_id = ? AND goal_id = ?";
  const [rows]: any = await db.query<RowDataPacket[]>(sql, [userId, goalId]);
  return rows[0].count > 0;
};


export const deleteGoalMember = async (
  goalId: number,
  userId: number
): Promise<void> => {
  const sql = "DELETE FROM goal_members WHERE goal_id = ? AND user_id = ?";
  await db.query(sql, [goalId, userId]);
}

export const isAdminGoalMember = async (
  userId: number,
  goalId: number
): Promise<boolean> => {
  const sql = `SELECT COUNT(*) as count FROM goal_members 
               WHERE role = 'admin' AND goal_id = ? AND user_id = ?`;
  const [rows]: any = await db.query<RowDataPacket[]>(sql, [goalId, userId]);
  return rows[0].count > 0;
};