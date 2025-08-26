import { defineStore } from "pinia";
import {
  getAllGoals,
  createGoal,
  getGoalById,
  updateGoal,
  deleteGoal,
} from "@/api/goal";

interface Goal {
  id: number;
  title: string;
  description: string;
  ownerId: number;
}

export const useGoalStore = defineStore("goal", {
  state: () => ({
    goals: [] as Goal[],
    loading: false,
  }), 
  persist: true,
  actions: {
    async fetchGoals() {
      this.loading = true;
      try {
        const response = await getAllGoals();
        this.goals = response.data.data;
      } catch (error) {
        console.error("Error fetching goals:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchGoalById(goalId: number) {
      this.loading = true;
      try {
        const response = await getGoalById(goalId);
        return response.data;
      } catch (error) {
        console.error("Error fetching goal by ID:", error);
      } finally {
        this.loading = false;
      }
    },

    async addGoal(goal: { title: string; description: string; ownerId: number }) {
      this.loading = true;
      try {
        const response = await createGoal(goal);
        this.goals.push(response.data);
      } catch (error) {
        console.error("Error adding goal:", error);
      } finally {
        this.loading = false;
      }
    },

    async updateGoalById(id: number, data: any) {
      this.loading = true;
      try {
        const response = await updateGoal(id, data);
        const index = this.goals.findIndex((goal) => goal.id === id);
        if (index !== -1) {
          this.goals[index] = response.data;
        }
      } catch (error) {
        console.error("Error updating goal:", error);
      } finally {
        this.loading = false;
      }
    },

    async removeGoal(id: number) {
      this.loading = true;
      try {
        await deleteGoal(id);
        this.goals = this.goals.filter((goal) => goal.id !== id);
      } catch (error) {
        console.error("Error deleting goal:", error);
      } finally {
        this.loading = false;
      }
    },

    async countMembers(goalId: number) {
      // this.loading = true;
      // try {
      //   const response = await getGoalById(goalId);
      //   return response.data.countMember;
      // } catch (error) {
      //   console.error("Error counting members:", error);
      // } finally {
      //   this.loading = false;
      // }
    }
  }
})
