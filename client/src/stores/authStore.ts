import { defineStore } from "pinia";
import { login, register } from "@/api/auth";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null as {
      id: number;
      username: string;
      phone: string;
      email: string;
    } | null,
  }),

  actions: {
    async loginUser(payload: { email: string; password: string }) {
      const res = await login(payload);
      console.log(res);
      this.token = res.data.token;
      localStorage.setItem("token", this.token ?? "");
      this.loadUserFromToken();
      return res;
    },

    async registerUser(payload: {
      username: string;
      email: string;
      phone: string;
      password: string;
    }) {
      try {
        const res = await register(payload);
        this.token = res.data.token;
        localStorage.setItem("token", this.token ?? "");
      } catch (error: any) {
        if (error.response) {
          throw {
            status: error.response.status,
            message: error.response.data.message || "Lỗi đăng ký",
          };
        } else {
          throw { status: 500, message: "Server error" };
        }
      }
    },

    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    loadUserFromToken() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decode = jwtDecode<User>(token);
          this.user = {
            id: decode.id,
            username: decode.username,
            phone: decode.phone,
            email: decode.email,
          };
          localStorage.setItem("user", JSON.stringify(this.user));
        } catch (error) {
          console.log(error);
          this.token = "";
          this.user = null;
        }
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },
});
