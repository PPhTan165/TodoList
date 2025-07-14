<script setup lang="ts">
import { nextTick, ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import * as yup from "yup";

const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();
const schema = yup.object().shape({
  email: yup.string().required("Username không được để trống"),
  password: yup.string().required("Password không được để trống"),
});

const handleLogin = async () => {
  try {
    await schema.validate(
      { email: email.value, password: password.value },
      { abortEarly: false }
    )

    // chờ loginUser hoàn tất
    await authStore.loginUser({ email: email.value, password: password.value })

    // đảm bảo vue đã phản ứng xong
    await nextTick()


    router.push('/')   // chỉ push sau khi store đã sẵn sàng
  } catch (err: any) {
    if (err.errors) {
      alert(err.errors.join(', '))
    } else {
      alert('Đăng nhập thất bại')
    }
  }
}


</script>

<template>
  <div>
    <h2>Đăng nhập</h2>
    <input v-model="email" placeholder="email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button class="btn-action" type="submit" @click="handleLogin">Login</button>
  </div>
</template>

<style scoped>
input {
  width: 100%;
  padding: 1rem;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
