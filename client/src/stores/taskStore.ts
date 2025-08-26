import { defineStore } from "pinia";
import {
  getTasksByGoalId,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "@/api/task";

interface Task {
  id: number;
  title: string;
  note: string;
  start_at: Date;
  due_at: Date;
  status: string;
  goal_id: number;
  assignee_id: number;
}


export const useTodoStore = defineStore("todo", {
  state: () => ({
    tasks: [] as Task[],
    txtSearch: "",
    loading: false,
  }),

  actions: {
    async fetchTasks(goalId: number) {
      this.loading = true;
      try {
        const response = await getTasksByGoalId(goalId);
        this.tasks = response.data;
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchTodoById(goalId: number, taskId: number) {
      this.loading = true;
      try {
        const respone = await getTaskById(goalId, taskId);
        this.tasks = respone.data;
      } catch (error) {
        console.error("Error fetching todo by ID:", error);
      }
    },

    async addTask(
      goalId: number,
      data: {
        title: string;
        note: string;
        start_at: Date;
        due_at: Date;
        assignee_id: number;
      }
    ) {
      this.loading = true;
      try {
        const response = await createTask(goalId, data);
        this.tasks.push(response.data);
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    },

    async removeTask(goalId: number, taskId: number) {
      this.loading = true;
      try {
        await deleteTask(goalId, taskId);
        this.tasks = this.tasks.filter((item) => item.id !== taskId);
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },

    async updateTaskById(
      goalId: number,
      taskId: number,
      data: {
        title: string;
        note: string;
        start_at: Date;
        due_at: Date;
        assignee_id: number;
      }
    ) {
      this.loading = true;
      try {
        await updateTask(goalId, taskId, data);
        const index = this.tasks.findIndex((item) => item.id === taskId);
        if (index !== -1) {
          this.tasks[index].title = data.title;
        }
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    },
  },

  getters: {
    filteredTasks(state) {
      return state.tasks.filter((item) =>
        item.title.toLowerCase().includes(state.txtSearch.toLowerCase())
      );
    },
  },
});
