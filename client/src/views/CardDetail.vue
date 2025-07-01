<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Store from '../store/Store.ts'

const route = useRoute()
const router = useRouter()
const store = Store();

const goBack = () => {
    router.push('/');
}

</script>

<template>
    <div class="card-detail">
        <h1>Card Detail</h1>
        <p>Name: </p>
        <button @click="goBack">Go Back</button>
    </div>
</template>

<style scoped>

</style>