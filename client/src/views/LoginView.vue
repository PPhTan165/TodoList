<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()
const schema = yup.object().shape({
  email: yup.string().required('Username không được để trống'),
  password: yup.string().required('Password không được để trống'),
})

const handleLogin = async () => {
    try {
        await schema.validate({ email: email.value, password: password.value }, { abortEarly: false })
        await auth.loginUser({ email: email.value, password: password.value })
        router.push('/')
    } catch (err: any) {
        alert(err.errors.join(', '))
    }
}
</script>

<template>
  <div>
    <h2>Đăng nhập</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
    input{ 
    width: 100%;
    padding: 1rem;
    margin-bottom: 16px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
</style>
