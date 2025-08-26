<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { useGoalStore } from "@/stores/goalStore";
import GoalComponent from "@/components/Goals/GoalComponent.vue";
import GoalSkeletonComponent from "@/components/Goals/GoalSkeletonComponent.vue";
import HeaderComponent from "@/components/header/HeaderComponent.vue";
import { onMounted, ref } from "vue";

const txtSearch = ref("");
const countMember = ref(0);
const authStore = useAuthStore();
const goalStore = useGoalStore();

onMounted(async () => {
  await goalStore.fetchGoals();
});
</script>

<template>
  <main>
    <HeaderComponent />

    <section class="home-view">
      <h1>TRANG CHỦ</h1>
      <div class="search-input">
        <input
          type="text"
          v-model="txtSearch"
          placeholder="Search your projects..."
        />
      </div>

      <div class="container" v-if="authStore.isAuthenticated">
        <div class="goal-user" v-for="goal in goalStore.goals">
          <GoalComponent
            :id="goal.id"
            :title="goal.title"
            :description="goal.description"
            :countMember="countMember"
          />
        </div>
        <GoalSkeletonComponent />
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-view {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
  font-weight: bold;
}
.search-input {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
input {
  width: 800px;
  padding: 1rem 1rem;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 20px;
  padding: 20px;
  margin: 0 1.5rem;
}
</style>
