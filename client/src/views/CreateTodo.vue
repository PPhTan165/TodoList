<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTodoStore } from '@/stores/todoStore';

const router = useRouter();
const todoStore = useTodoStore();
const title = ref('');

const handleCreateTodo = () => {
    if(title.value.trim() === '') {
        alert('Title cannot be empty');
        return;
    }
    console.log('Creating todo with title:', title.value.trim());
    todoStore.addTodo(title.value.trim());
    // title.value = '';
    router.push('/');
}

onMounted(() => {
    todoStore.fetchTodos();});
</script>

<template>
    <main>
        <h1>Create Todo</h1>
        <div class="create-todo-form">
            <label for="">Title</label>
            <input type="text" placeholder="Enter todo title" v-model="title"/>
            <button @click="handleCreateTodo">CREATE TITLE</button>
        </div>
    </main>
</template>

<style scoped>
h1{
    text-align: center;
    margin-bottom: 20px;
    font-size: 2rem;
    color: #333;
}
.create-todo-form {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin: auto;
}
.create-todo-form label {
    margin-bottom: 8px;
    font-weight: semibold;
    font-size: 1.2rem;
    background-color: white;

}

.create-todo-form input {
    width: 100%;
    padding: 1rem 1rem;
    margin-bottom: 16px;
    border: 1px solid #bebebe9f;
    border-radius: 8px;
}
.create-todo-form button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

</style>