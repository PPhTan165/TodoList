<script setup lang="ts">
import { useGoalStore } from "@/stores/goalStore";
import { defineProps, defineEmits, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const router = useRouter();
const goalStore = useGoalStore();
const isSettingVisible = ref<boolean>(false);
const dropdown = document.querySelector(".dropdown");
const items = document.querySelector(".dropdown-items");

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  countMember: {
    type: Number,
    default: 1,
  },
});

const emits = defineEmits<{
  (event: "detail-click", id: number): void;
}>();

const handleDetailClick = () => {
  emits("detail-click", props.id);
  router.push(`/goal/${props.id}`);
};

const handleRemoveGoal = () => {
  goalStore.removeGoal(props.id);
  router.push("/");
};

const isToggleSetting = () => {
  isSettingVisible.value = !isSettingVisible.value;
};
</script>

<template>
  <main>
    <div class="goal-card">
      <div class="top">
        <div class="title-info">
          <h2>{{ props.title }}</h2>
          <p>{{ props.description }}</p>
        </div>

        <div class="dropdown-wrapper">
          <span class="dropdown">
            <FontAwesomeIcon :icon="['fas', 'ellipsis']" />
          </span>

          <div class="dropdown-item">
            <a @click="handleDetailClick">Chi tiết</a>
            <a @click="">Cập nhật</a>
            <a @click="handleRemoveGoal">Xóa</a>
          </div>
        </div>

      </div>

      <div class="bottom">
        <span>
          <FontAwesomeIcon class="icon" :icon="['fas', 'user']" />
          {{ countMember }}
        </span>
      </div>
    </div>
  </main>
</template>

<style scoped>
.goal-card {
  position: relative;
  height: 150px;
  border: 2px solid #000000;
  border-radius: 8px;
  padding: 16px;
  padding-bottom: 40px;
  margin: 16px;
  cursor: pointer;
  transition: all 0.1s ease-in;
}

.top {
  display: flex;
  justify-content: space-between;
}
.title-info {
  flex: 100;
}

.dropdown-wrapper {
  position: relative;
}

.dropdown-item {
  position: absolute;
  top: 16px;
  left: 0;
  width: 150px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: none;
  z-index: 1;
}

.dropdown-wrapper:hover > .dropdown-item {
  display: inline-block;
  pointer-events: all;
}

.dropdown-item a {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: #333;
}

.dropdown-item a:hover {
  background-color: #f0f0f0;
}

.bottom {
  position: absolute;
  bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #444;
}


</style>
