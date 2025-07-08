import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from '../views/CreateTodo.vue'
import CardDetail from '@/views/CardDetail.vue'
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
    }
  
  ],
})

export default router
