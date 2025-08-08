import api from "@/api/axios";

const BASE_URL = "http://localhost:3000/api/goals";

export const getTasksByGoalId = (goalId: number) =>
  api.get(`${BASE_URL}/${goalId}/tasks`);

export const getTaskById = (goalId: number, taskId: number) =>
  api.get(`${BASE_URL}/${goalId}/tasks/${taskId}`);

export const createTask = (
  goalId: number,
  task: {
    title: string;
    note: string;
    start_at: Date;
    due_at: Date;
    assignee_id: number;
  }
) => api.post(`${BASE_URL}/${goalId}/tasks`, task);

export const updateTask = (goalId: number, taskId: number, data: any) =>
  api.put(`${BASE_URL}/${goalId}/tasks/${taskId}`, data);

export const deleteTask = (goalId: number, taskId: number) =>
  api.delete(`${BASE_URL}/${goalId}/tasks/${taskId}`);
