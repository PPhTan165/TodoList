<script setup>
import TaskTable from "./TaskTable.vue";

defineProps({
  title: String,
  titleColor: String,
  tasks: Array,
});
</script>

<template>
  <div class="task-section">
    <h3 :style="{ color: titleColor }">{{ title }}</h3>
    <TaskTable :tasks="tasks" />
  </div>
</template>

<style scoped>
.task-section {
  border-bottom: 2px solid;
  padding: 10px;
  margin-bottom: 20px;
}
.task-section h3 {
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 26px;
}
</style>
