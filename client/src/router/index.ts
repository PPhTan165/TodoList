import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from '../views/CreateTodo.vue'
import CardDetail from '@/views/CardDetail.vue'
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
      path: '/create',
      name: 'create',
      component: CreateView,
    },
    {
      path: '/todo/:id',
      name: 'todo-detail',
      component: CardDetail,
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
