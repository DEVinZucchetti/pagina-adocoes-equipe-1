import { createRouter, createWebHistory } from 'vue-router'

import Pets from '@/views/diegoBatista/Pets.vue'
import Home from '@/views/diegoBatista/Home.vue'
import Profile from '@/views/diegoBatista/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pets-adocao',
      name: 'Pets',
      component: Pets
    },
    {
      path: '/perfil',
      name: 'Profile',
      component: Profile
    }   
  ]
})

export default router
