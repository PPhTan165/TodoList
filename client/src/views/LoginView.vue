<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const goHome = () => {
  router.push("/");
};

const register = () => {
  router.push("/register");
};

const handleLogin = () => {
  const email = authStore.email;
  const password = authStore.password;
  console.log(`emmail: ${email}, 
  password: ${password}`);
  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }
  authStore.loginUser({ email, password })
    .then(() => {
      console.log("Login successful");
      router.push("/");
    })
    .catch((error) => {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    });
  console.log("Login button clicked");
};
</script>

<template>
  <section>
    <div class="container">
      <div class="login-box">
        <!-- Quay lại -->
        <button class="back-btn" @click="goHome()">◀ Quay lại</button>

        <!-- Đăng ký -->
        <button class="register-btn" @click="register">Đăng ký ▶</button>

        <h2 class="title">ĐĂNG NHẬP</h2>
        <form @submit.prevent="handleLogin">
          <div class="content">
            <!-- Left side -->
            <div class="left">
              <label>Email</label>
              <input type="email" v-model="authStore.email" />

              <label>Password</label>
              <input type="password" v-model="authStore.password" />

              <div class="remember">
                <input type="checkbox" id="remember" tabindex="-1" />
                <label for="remember">Ghi nhớ đăng nhập</label>
              </div>

              <button class="login-btn" type="submit">Đăng nhập</button>
            </div>

            <!-- Divider -->
            <div class="divider"></div>

            <!-- Right side -->
            <div class="right">
              <button class="social-btn google">Login with Google</button>
              <button class="social-btn facebook">Login with Facebook</button>
              <button class="social-btn github">Login with Github</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Toàn màn hình */

/* Background phủ full màn hình */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw; /* full chiều rộng */
  height: 100vh; /* full chiều cao */
  background: #f5f5f5;
  background-size: cover;
  background-attachment: fixed; /* luôn full màn hình */
}

/* Hộp login */
.login-box {
  position: relative;
  background: #fff;
  padding: 50px 70px;
  width: 1200px; /* tỉ lệ desktop hợp lý */
  max-width: 95%; /* responsive cho màn nhỏ hơn */
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

/* Nút top */
.back-btn,
.register-btn {
  position: absolute;
  top: 20px;
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  font-size: 15px;
}

.back-btn {
  left: 25px;
}
.register-btn {
  right: 25px;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 26px;
  font-weight: bold;
}

/* Layout chia 2 */
.content {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: 40px;
}

.left,
.right {
  display: flex;
  flex-direction: column;
}

.left label {
  margin-top: 12px;
  font-size: 15px;
}

.left input[type="email"],
.left input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
}

.remember {
  display: inline-block;
  margin: 12px 0;
  font-size: 14px;
  color: #555;
}
.remember input {
  margin-right: 10px;
}
.login-btn {
  padding: 12px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
}

.login-btn:hover {
  background: #1976d2;
}

/* Đường kẻ chia */
.divider {
  background: #ccc;
}
.right {
  margin-top: 28px;
}
/* Nút social */
.social-btn {
  margin-bottom: 14px;
  padding: 12px;
  border: 1px solid #555;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 15px;
  transition: 0.2s;
}

.social-btn:hover {
  background: #f2f2f2;
}
</style>
