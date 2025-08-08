<script setup lang="ts">
import HeaderComponent from "@/components/header/HeaderComponent.vue";
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import TaskSection from "@/components/Task/TaskSection.vue";
import MemberList from "@/components/Member/MemberList.vue";

const title = ref<string>("Chi tiết mục tiêu");

const tasksTodo = [
  {
    title: "Viết báo cáo",
    date: "07/08/2025",
    owner: "Phan Phúc Tân",
    isNew: true,
  },
  {
    title: "Viết báo cáo",
    date: "07/08/2025",
    owner: "Tân Phan Phúc",
    isNew: true,
  },
  {
    title: "Viết báo cáo",
    date: "07/08/2025",
    owner: "Phúc Tân Phan",
    isNew: true,
  },
];

const tasksInProgress = [
  { title: "Viết báo cáo", date: "01/08/2025", owner: "Phan Phúc Tân" },
  { title: "Viết báo cáo", date: "01/08/2025", owner: "Phan Phúc Tân" },
];

const tasksWarning = [
  { title: "Viết báo cáo", date: "16/07/2025", owner: "Phan Phúc Tân" },
  { title: "Viết báo cáo", date: "16/08/2025", owner: "Phan Phúc Tân" },
];

const tasksDone = [
  { title: "Viết báo cáo", date: "01/07/2025", owner: "Phan Phúc Tân" },
  { title: "Viết báo cáo", date: "01/08/2025", owner: "Phan Phúc Tân" },
];
</script>

<template>
  <main>
    <HeaderComponent />
    <section class="container">
      <div class="left">
        <MemberList
          :admins="['Phan Phúc Tân']"
          :members="['Tân Phan Phúc', 'Tân Phúc Phan', 'Phúc Tân Phan','Phúc Tân Phan','Phúc Tân Phan' ]"
        />
      </div>

      <div class="right">
        <div class="header-contain">
          <h2>
            {{ title }}
            <span @click="">
              <FontAwesomeIcon :icon="['fa', 'arrow-right']" />
            </span>
          </h2>
          <div class="item">
            <FontAwesomeIcon :icon="['fa', 'message']" />
            <FontAwesomeIcon :icon="['fa', 'download']" />
          </div>
        </div>

        <div class="task-list">

          <TaskSection 
          title="Công việc" 
          titleColor="blue" 
          :tasks="tasksTodo" 
          />

          <TaskSection
            title="Đang tiến hành"
            titleColor="orange"
            :tasks="tasksInProgress"
          />

          <TaskSection
            title="Cảnh báo thời hạn"
            titleColor="red"
            :tasks="tasksWarning"
          />

          <TaskSection
            title="Hoàn thành"
            titleColor="green"
            :tasks="tasksDone"
          />

        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: top;
  gap: 50px;
  padding: 20px;
  margin-top: 1rem;
}

.left {
  width: 350px;
  height: auto;
  background-color: #f0f0f0;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  padding: 20px;
}
.right {
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.right .header-contain {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.right .header-contain .item {
  font-size: 24px;
  padding: 16px;
  display: flex;
  gap: 10px;
}
</style>
