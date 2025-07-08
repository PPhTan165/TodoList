<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore';
import { onMounted } from 'vue';
import CardComponent from '@/components/card/CardComponent.vue';
import router from '@/router';
const todoStore = useTodoStore();

onMounted(() => {
  todoStore.fetchTodos();
})

const handleCardDetailClick = (id:number) => {
  router.push(`/todo/${id}`);
}
</script>

<template>
  <main>
    <h1>Todo List</h1>
    <div v-for="todo in todoStore.todos" @click="handleCardDetailClick(todo.id)">
      <CardComponent 
      :title="todo.title"
      :id = "todo.id" />
    </div>
  </main>
</template>
