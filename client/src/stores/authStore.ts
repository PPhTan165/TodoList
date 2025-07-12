import { defineStore } from "pinia";
import { login, register } from "@/api/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as { email: string; password: string } | null,
    token: localStorage.getItem("token") || null,
  }),

  actions: {
    async loginUser(payload: { email: string; password: string }) {
      const res = await login(payload);
      this.token = res.data.token;
      this.user = res.data.user;
      localStorage.setItem("token", this.token ?? "");
    },

    async registerUser(payload: { email: string; password: string }) {
      const res = await login(payload);
      this.token = res.data.token;
      this.user = res.data.user;
      localStorage.setItem("token", this.token ?? "");
    },
    
    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
    },
  },
});
