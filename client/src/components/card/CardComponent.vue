<script setup lang="ts">
import { useTodoStore } from "@/stores/todoStore";
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const todoStore = useTodoStore();
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
const emits = defineEmits<{
  (event: "detail-click", id: number): void;
}>();

const handleDetailClick = () => {
  // emits("detail-click", props.id);
  console.log("Card clicked with ID:", props.id);
};

const handleRemoveTodo = () => {
  todoStore.removeTodo(props.id);
  router.push("/");
};
</script>

<template>
  <div class="card" @click="handleDetailClick()">
      <h2>{{ title }}</h2>
    <button class="btn-dlt" @click="handleRemoveTodo()">Remove Todo</button>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  width: 500px;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  background-color: #3d3d3d;
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease-in;
  gap: 16px;
}
.card h2 {
  word-break: break-word;        /* hoặc dòng dưới */
  overflow-wrap: anywhere;       /* giúp xuống dòng bất chấp có khoảng trắng hay không */
}
.card:hover {
  background-color: #ffffff;
  color: #000000;
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.1);
}
</style>
