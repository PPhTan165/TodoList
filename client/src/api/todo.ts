import axios from "axios";

const BASE_URL = "http://localhost:3000/api/todos";

export const getTodos = () => axios.get(BASE_URL);
export const getTodoById = (id:number) => axios.get(`${BASE_URL}/${id}`);
export const createTodo = (todo: { title: string }) =>
  axios.post(BASE_URL, todo);
export const updateTodo = (id: number, data: any) =>
  axios.put(`${BASE_URL}/${id}`, data);
export const deleteTodo = (id: number) => axios.delete(`${BASE_URL}/${id}`);
