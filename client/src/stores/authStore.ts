import { defineStore } from "pinia";
import { login, register } from "@/api/auth";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: number;
  fullname: string;
  email: string;
  phone: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null as {
      id: number;
      fullname: string;
      phone: string;
      email: string;
    } | null,
  }),

  actions: {
    async loginUser(payload: { email: string; password: string }) {
      const res = await login(payload);
      this.token = res.data.token;
      localStorage.setItem("token", this.token ?? "");
      this.loadUserFromToken();
      return res;
    },

    async registerUser(payload: {
      fullname: string;
      email: string;
      phone: string;
      password: string;
    }) {
      const res = await register(payload);
      this.token = res.data.token;
      localStorage.setItem("token", this.token ?? "");
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
          const decode = jwtDecode<JwtPayload>(token);
          this.user = {
            id: decode.id,
            fullname: decode.fullname,
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
