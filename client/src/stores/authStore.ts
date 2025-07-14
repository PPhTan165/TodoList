import { defineStore } from "pinia";
import { login, register } from "@/api/auth";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: number;
  email: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null as { id: number; email: string } | null,
  }),

  actions: {
    async loginUser(payload: { email: string; password: string }) {
      const res = await login(payload);
      this.token = res.data.token;
      localStorage.setItem("token", this.token ?? "");
      this.loadUserFromToken();
      return res;
    },

    async registerUser(payload: { email: string; password: string }) {
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
          this.user = { id: decode.id, email: decode.email };
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
