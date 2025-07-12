import axios from 'axios';

const BASE_URL = "http://localhost:3000/api/auth";

export const register = (user: {email: string, password: string}) => axios.post(`${BASE_URL}/register`, user);
export const login = (user: {email: string, password: string}) => axios.post(`${BASE_URL}/login`, user);