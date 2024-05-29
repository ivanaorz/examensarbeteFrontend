import { createRouter, createWebHistory } from 'vue-router'
import HomePageView from '../views/HomePageView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePageView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    
  ]
})

export default router
