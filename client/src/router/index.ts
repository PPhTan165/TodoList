import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateGoal from '../views/Goal/CreateGoalView.vue'
import TaskDetail from '../views/Task/TaskDetailView.vue'
import GoalDetail from '@/views/Goal/GoalDetailView.vue'
import { useAuthStore } from '@/stores/authStore'
// This file is part of the TodoVue project.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/createGoal',
      name: 'createGoal',
      component: CreateGoal,
    },
    {
      path: '/goal/:goalId',
      name: 'goal-detail',
      component: GoalDetail,
    },
    {
      path: '/goal/:goalId/tasks/:taskId',
      name: 'task-detail',
      component: TaskDetail
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    }
  
  ],


})

router.beforeEach((to,_,next) => {
  const auth = useAuthStore();
  if(to.meta.requireAuth && ! auth.token){
    next({ name: 'login' });
  }else{
    next();
  }
})

export default router
