<script setup lang="ts">
import { useTodoStore } from "@/stores/todoStore";
import { onMounted, ref } from "vue";
import CardComponent from "@/components/card/CardComponent.vue";
import { useRouter } from "vue-router";
import draggable from "vuedraggable";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const todoStore = useTodoStore();
const authStore = useAuthStore();
onMounted(() => {
  todoStore.fetchTodos();
});



</script>

<template>
  <main>
    <h1>TODO LIST</h1>
    <input
      type="text"
      v-model="todoStore.txtSearch"
      placeholder="Search todos by title"
    />
    <div class="container" v-if="authStore.isAuthenticated">
      <div class="item" v-for="todo in todoStore.filteredTodos">
        
        <CardComponent 
        :title="todo.title"
        :id = "todo.id" />
      </div>
    </div>
    <div v-else>
      Trang chủ Todo List
    </div>


  </main>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
  font-weight: bold;
}
.container{ 
  display: grid;
  grid-template-columns: repeat(2,1fr);
}
.item {
  max-width: 450px;

}
input {
  width: 100%;
  padding: 1rem 1rem;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
