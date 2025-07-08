import { defineStore } from "pinia";
import { deleteTodo, getTodos, createTodo, getTodoById } from "@/api/todo";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [] as { id: number; title: string }[],
    currentTodo: null as { id: number; title: string, completed: boolean} | null,
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
    async fetchTodoById(id: number){
      this.loading = true;
      try {
        const respone = await getTodoById(id);
        this.currentTodo = respone.data;
      } catch (error) {
        console.error("Error fetching todo by ID:", error);
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
