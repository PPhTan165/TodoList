<script setup lang="ts">
import { useTodoStore } from "@/stores/todoStore";
import { useAuthStore } from "@/stores/authStore";
import GoalComponent from "@/components/Goals/GoalComponent.vue";
import GoalSkeletonComponent from "@/components/Goals/GoalSkeletonComponent.vue";
import HeaderComponent from "@/components/header/HeaderComponent.vue";

const todoStore = useTodoStore();
const authStore = useAuthStore();

const goals = [
  {
    id: 1,
    title: "Card 1",
    description: "Description for Card 1",
    countMember: 3,
  },
  {
    id: 2,
    title: "Card 2",
    description: "Description for Card 2",
    countMember: 5,
  },
  {
    id: 3,
    title: "Card 3",
    description: "Description for Card 3",
    countMember: 2,
  },
  {
    id: 4,
    title: "Card 4",
    description: "Description for Card 1",
    countMember: 3,
  },
];
</script>

<template>
  <main>
    <HeaderComponent />

    <section class="home-view">
      <h1>TRANG CHỦ</h1>
      <div class="search-input">

        <input
        type="text"
        v-model="todoStore.txtSearch"
        placeholder="Search your projects..."
        />
      </div>

      <div class="container">
        <div class="goal-user" v-for="goal in goals">
          <GoalComponent
            :id="goal.id"
            :title="goal.title"
            :description="goal.description"
            :countMember="goal.countMember"
          />
        </div>
        <GoalSkeletonComponent />
      </div>
    </section>

    <!-- <div class="container" v-if="authStore.isAuthenticated">
        
      </div>
    <div v-else>
      Trang chủ Todo List
    </div> -->
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
