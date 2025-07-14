import axios from "axios";
import api from "@/api/axios";

const BASE_URL = "http://localhost:3000/api/todos";

export const getTodos = () => api.get(BASE_URL);
export const getTodoById = (id:number) => api.get(`${BASE_URL}/${id}`);
export const createTodo = (todo: { title: string }) =>
  api.post(BASE_URL, todo);
export const updateTodo = (id: number, data: any) =>
  api.put(`${BASE_URL}/${id}`, data);
export const deleteTodo = (id: number) => api.delete(`${BASE_URL}/${id}`);
