import api from "@/api/axios";

const BASE_URL = "http://localhost:3000/api/goals";

export const getAllGoals = () => api.get(BASE_URL);
export const getGoalById = (goalId:number) => api.get(`${BASE_URL}/${goalId}`);
export const createGoal = (goal: { title: string, description: string, ownerId: number }) =>
  api.post(BASE_URL, goal);
export const updateGoal = (id: number, data: any) =>
  api.put(`${BASE_URL}/${id}`, data);
export const deleteGoal = (id: number) => api.delete(`${BASE_URL}/${id}`);
