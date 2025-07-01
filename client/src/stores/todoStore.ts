import { defineStore } from "pinia";
import { deleteTodo, getTodos, createTodo } from "@/api/todo";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [] as { id: number; title: string }[],
    loading: false,
  }),

  actions: {
    async fetchTodos() {
      this.loading = true;
      try {
        const response = await getTodos();
        this.todos = response.data;
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        this.loading = false;
      }
    },

    async addTodo(title: string) {
      try {
        const response = await createTodo({ title });
        this.todos.push(response.data);
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    },

    async removeTodo(id: number) {
      try {
        await deleteTodo(id);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },
  },
});
