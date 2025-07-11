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
const handleUpdateTodo = () => {
  todoStore.updateTodoList(todoId, todoStore.currentTodo);
  router.push("/");
};
</script>

<template>
  <h1>Chi tiết thẻ</h1>
  <div class="card-detail" v-if="todoStore.currentTodo">
    <div class="input-group">
      <label for="">Title</label>
      <input type="text" v-model="todoStore.currentTodo.title"  />
    </div>
    <div class="btn-group">
      <button class="btn-update" @click="handleUpdateTodo">
        Update Todo
      </button>
      <button class="btn-action" @click="goBack">Go Back</button>
    </div>
  </div>
</template>

<style scoped>
.card-detail {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}
.input-group {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 1rem;
}
input[type="text"] {
  width: 700px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
.btn-group {
  display: flex;
  gap: 10px;
}
</style>
