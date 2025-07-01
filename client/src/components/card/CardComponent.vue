<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

</script>

<template>
    <div class="card">
        <h2>{{ title }}</h2>
    </div>
</template>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin: 16px;
    background-color: #f9f9f9;
}
</style>
