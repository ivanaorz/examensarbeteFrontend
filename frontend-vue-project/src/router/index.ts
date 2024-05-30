import { createRouter, createWebHistory } from 'vue-router'
import HomePageView from '../views/HomePageView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import PersonalPageView from '../views/PersonalPageView.vue';
import CreateBookView from '../views/CreateBookView.vue';
import SeeBooksView from '../views/SeeBooksView.vue';
import UpdateBookView from '../views/UpdateBookView.vue';
import DeleteBookView from '../views/DeleteBookView.vue';
import SeeWritersView from '@/views/SeeWritersView.vue';

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
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/personal-page',
      name: 'personalPage',
      component: PersonalPageView
    },
   
    {
      path: '/create-book',
      name: 'CreateBookEntry',
      component: CreateBookView
    },
    {
      path: '/list',
      name: 'ListBookEntries',
      component: SeeBooksView
    },
    {
      path: '/update-book',
      name: 'UpdateBookEntry',
      component: UpdateBookView
    },
    {
      path: '/delete-book',
      name: 'DeleteBookEntry',
      component: DeleteBookView
    },
    {
      path: '/see-writers',
      name: 'SeeWriters',
      component: SeeWritersView
    }
    
  ]
})

export default router
