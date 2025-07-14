<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { computed, onMounted, ref } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const userEmail = computed(() => authStore.user?.email);
console.log(userEmail)
const isToggleDropDown = ref(false);


const handleDropDown = () => { 
  isToggleDropDown.value = !isToggleDropDown.value;
}

const goToProfile = () => {
  router.push('/profile/:id');
}

const handleLogout = () => {
  authStore.logout();
  router.push("/");
};

onMounted(() => {
  authStore.loadUserFromToken();
});
</script>

<template>
  <nav>
    <div class="nav-left">
      <RouterLink class="nav-item" to="/">Home</RouterLink>
      <RouterLink class="nav-item" to="/create">Add</RouterLink>
    </div>

    <div class="nav-right">
      <div class="dropdown-container" @click="handleDropDown" v-if="authStore.isAuthenticated">
        <span class="username">Xin chào {{ userEmail.toUpperCase().split('@')[0] }} </span>
        <div v-if="isToggleDropDown" class="dropdown-menu">
          <ul>
            <li @click="goToProfile"> Profile</li>
            <li @click="handleLogout"> Logout</li>
          </ul>
        </div>
      </div>
      <div v-else>
        <RouterLink class="nav-item" to="/login">Login</RouterLink>
        <RouterLink class="nav-item" to="/register">Register</RouterLink>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
}

nav a {
  width: 100px;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: white;
  margin-right: 1rem;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  background-color: rgb(69, 171, 240);
  padding: 1rem 0.5rem;
  transition: all 0.3s ease;
}
nav a:hover {
  border: 1px solid rgb(69, 171, 240);
  background-color: white;
  color: rgb(69, 171, 240);
}

.nav-item {
  display: inline-block;
  margin: 0 10px;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  color: white;
  text-decoration: none;
  background-color: rgb(69, 171, 240);
  border: 1px solid rgb(69, 171, 240);
}
.dropdown-container {
  position: relative;
  cursor: pointer;
  user-select: none;
}

.username {
  font-weight: bold;
}

.dropdown-menu {
  position: absolute;
  top: 30px;
  right: -20px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 150px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  z-index: 100;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 8px 0;
}

.dropdown-menu li {
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-menu li:hover {
  background: #f0f0f0;
}
</style>
