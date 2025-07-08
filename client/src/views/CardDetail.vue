<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTodoStore } from "@/stores/todoStore";

const route = useRoute();
const router = useRouter();
const todoStore = useTodoStore();
const todoId = route.params.id;

onMounted(() => {
  const id = Number(todoId);
  todoStore.fetchTodoById(todoId);
});

const goBack = () => {
  router.push("/");
};
const handleRemoveTodo = (id) => {
  todoStore.removeTodo(id);
  router.push("/");
};
</script>

<template>
  <div class="card-detail" v-if="todoStore.currentTodo">
    <h1>Detail</h1>
    <p>{{ todoStore.currentTodo.title }}</p>
    <button @click="handleRemoveTodo(todoId)">Remove Todo</button>
    <button @click="goBack">Go Back</button>
  </div>
</template>

<style scoped></style>
