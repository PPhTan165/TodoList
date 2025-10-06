<script setup>
import { useTodoStore } from '@/stores/taskStore';
import { useRouter, useRoute } from 'vue-router';

defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});
const router = useRouter();
const route = useRoute();
const todoStore = useTodoStore();
const handleDetailTask = (id) => { 

}
</script>

<template>
  <table class="task-table">
    <tbody>
      <tr v-for="(task, index) in tasks" :key="index">
        <td >
          {{ task.title }}
        </td>
        <td>
          {{ task.date }}
        </td>
        <td>{{ task.owner }}</td>
        <td>
          <button class="detail-btn">Chi tiết</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.task-table {
  width: 100%;
  border-collapse: collapse;
}
.task-table td {
  border: 1px solid #ccc;
  padding: 6px 10px;
}
.new-label {
  color: red;
  font-weight: bold;
  margin-right: 5px;
}
.detail-btn {
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
}
</style>
