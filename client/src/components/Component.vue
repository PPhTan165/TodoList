// Ví dụ trong component.vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const msg = ref('')

onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/ping')
  const data = await res.json()
  msg.value = data.message
})
</script>

<template>
  <p>Server said: {{ msg }}</p>
</template>
