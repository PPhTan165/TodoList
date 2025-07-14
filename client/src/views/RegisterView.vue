<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { ref } from "vue";
import * as yup from "yup";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errors = ref<Record<string, string>>({});

const router = useRouter();
const auth = useAuthStore();

// Schema xác thực
const schema = yup.object().shape({
  email: yup.string().required("Bắt buộc nhập email"),
  password: yup
    .string()
    .required("Bắt buộc nhập password")
    .min(6, "Tối thiểu 6 ký tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required("Nhập lại mật khẩu"),
});

const onSubmit = async () => {
  try {
    await schema.validate(
      {
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      },
      { abortEarly: false }
    );

    // Nếu hợp lệ → gửi đăng ký
    await auth.registerUser({ email: email.value, password: password.value });
    router.push("/login");
    alert('Đăng ký thành công')
  } catch (err: any) {
    // Hiển thị lỗi
    errors.value = {};
    err.inner.forEach((e: any) => {
      errors.value[e.path] = e.message;
    });
  }
};
</script>

<template>
  <div>
    <label>Email</label>
    <input type="email" v-model="email" />
    <p class="error" v-if="errors.email">{{ errors.email }}</p>
  </div>

  <div>
    <label>Password</label>
    <input v-model="password" type="password" />
    <p class="error" v-if="errors.password">{{ errors.password }}</p>
  </div>

  <div>
    <label>Confirm Password</label>
    <input v-model="confirmPassword" type="password" />
    <p class="error" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
  </div>

  <button type="submit" @click="onSubmit">Register</button>
</template>

<style scoped>
.error {
  color: red;
  font-size: 0.9rem;
}
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
  padding: 1rem;
  border-radius: 8px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
