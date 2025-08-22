<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { computed, onMounted, ref } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const username = computed(() => authStore.user?.username || "Guest");
const isToggleDropDown = ref(false);

const toggleDropDown = () => {
  isToggleDropDown.value = !isToggleDropDown.value;
};

const profile = () => {
  router.push("/profile/:Userid");
};
const scheduel = () => {};

const team = () => {};

const logout = () => {
  authStore.logout();
  router.push("/");
};

onMounted(() => {
  authStore.loadUserFromToken();
});
</script>

<template>
    <nav>
      <div class="left-nav">
        <RouterLink to="/"
          ><img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/1024px-Notion-logo.svg.png"
            alt="logo"
            width="50px"
            height="50px"
        /></RouterLink>
      </div>

      <div class="right-nav">
        <div v-if="!authStore.isAuthenticated">
          <RouterLink class="nav-item" to="/login">ĐĂNG NHẬP</RouterLink>
        </div>
        <div v-else>
          <span class="username" @click="toggleDropDown">{{ username }}</span>
          <div
            class="dropdown-menu"
            v-if="isToggleDropDown"
          >
            <ul>
              <li @click="profile">Hồ sơ cá nhân</li>
              <li @click="scheduel">Lịch công việc</li>
              <li @click="team">Nhóm</li>
              <li @click="logout">Đăng xuất</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  max-width: 1280px; /* hoặc 1280px tùy thiết kế */
  margin: 0 auto;    /* căn giữa trong header */
}


nav .right-nav .nav-item {
  text-decoration: none;
  color: #838383;
  font-weight: bold;
  font-size: 1.4rem;
  transition: 0.3s ease all;
}

nav .right-nav .nav-item:hover {
  color: rgb(0, 0, 0);
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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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
