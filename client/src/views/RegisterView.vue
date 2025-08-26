<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { registerSchema } from "@/validation/authSchema";
import { useForm, useField, validate } from "vee-validate";

const errors = ref<Record<string, string>>({});

const router = useRouter();
const authStore = useAuthStore();
const schema = registerSchema;
const confirmPassword = ref("");
const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: username, errorMessage: usernameError } = useField("username");
const { value: phone, errorMessage: phoneError } = useField("phone");
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");

const onSubmit = handleSubmit(async (values) => {

  if(password.value !== confirmPassword.value) {
    errors.value.confirmPassword = "Passwords do not match";
    return;
  }
  console.log(values);
  try {
    await authStore.registerUser({
      username: values.username,
      phone: values.phone,
      email: values.email,
      password: values.password,
    })
    router.push("/login");

  } catch (error: any) {
    throw new Error(error);
  }

});
</script>

<template>
  <section>
    <div class="container">
      <div class="login-box">
        <!-- Quay lại -->
        <button class="back-btn" @click="router.push(`/login`)">
          ◀ Quay lại
        </button>

        <h2 class="title">ĐĂNG KÝ</h2>
        <form @submit.prevent="onSubmit()">
          <div class="content">
            <!-- Left side -->
            <div class="left">
              <label>Fullname</label>
              <input type="text" v-model="username" />
              <span class="error">{{ usernameError }}</span>

              <label>Phone</label>
              <input type="text" v-model="phone" maxlength="10" />
              <span class="error">{{ phoneError }}</span>

              <label>Email</label>
              <input type="email" v-model="email" />
              <span class="error">{{ emailError }}</span>

              <label>Password</label>
              <input type="password"  v-model="password"/>
              <span class="error">{{ passwordError }}</span>

              <label>Confirm Password</label>
              <input type="password" v-model="confirmPassword" />
            </div>

            <!-- Divider -->
            <div class="divider"></div>

            <!-- Right side -->
            <div class="right">
              <button class="social-btn google">Login with Google</button>
              <button class="social-btn facebook">Login with Facebook</button>
              <button class="social-btn github">Login with Github</button>
              <button class="register-btn" type="submit">Đăng ký</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.error {
  color: red;
  font-size: 0.9rem;
}
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
.back-btn {
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
.left input[type="password"],
.left input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
}

.register-btn {
  padding: 12px;
  background: #2196f3;
  margin-top: 20px;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
}

.register-btn:hover {
  background: #1976d2;
}

/* Đường kẻ chia */
.divider {
  background: #ccc;
}
.right {
  margin-top: 35px;
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
