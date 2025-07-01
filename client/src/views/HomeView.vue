<script setup >
import { useTodoStore } from '@/stores/todoStore';
import { onMounted } from 'vue';
import CardComponent from '@/components/card/CardComponent.vue';
const todoStore = useTodoStore();
onMounted(() => {
  todoStore.fetchTodos();
})
</script>

<template>
  <main>
    <h1>Todo List</h1>
    <div v-for="todo in todoStore.todos" :key="todo.id">
      <CardComponent :title="todo.title" />
    </div>
  </main>
</template>
