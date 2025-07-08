<script setup >
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/create">Add</RouterLink>
    </nav>
    <RouterView />
</template>

<style scoped>
nav {
    display: flex;
    justify-content: start;
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
</style>