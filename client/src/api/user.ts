import api from "@/api/axios";

const BASE_URL = "http://localhost:3000/api/user";

export const getUser = () => api.get(BASE_URL);
export const getUserById = (id: number) => api.get(`${BASE_URL}/${id}`);


