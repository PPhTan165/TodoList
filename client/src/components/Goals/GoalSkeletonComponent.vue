<template>
  <main>
    <div class="goal-card" @click="handleAddGoal">
      <FontAwesomeIcon class="circle" :icon="['fas', 'plus']" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";
const router = useRouter()

const handleAddGoal = () => {
    router.push("/createGoal");
    console.log("Add Goal clicked");
};
</script>

<style scoped>
.goal-card {
  height: 150px;
  padding: 16px;
  margin: 16px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.goal-card:hover {
  transform: scale(1.05);
}

.circle {
  font-size: 1.2rem;
  color: #ccc;
  border: 2px solid #ccc;
  border-radius: 50%;
  padding: 15px;
}
</style>
