<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
const emits = defineEmits < {
  (event: 'detail-click', id: number): void;
}> ();

const handleDetailClick = () => {
   emits('detail-click', props.id);
};
</script>

<template>
    <div class="card" @click="handleDetailClick()">
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
