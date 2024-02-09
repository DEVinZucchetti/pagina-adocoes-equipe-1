import { createRouter, createWebHistory } from 'vue-router'

import Main from '../views/Main.vue'
import Home1 from '../views/pessoa1/Home.vue'
import Home2 from '../views/pessoa2/Home.vue'
import Home from '../views/Thiago/HomeView.vue'
import PetsList from '../views/Thiago/PetsList.vue'
import PetsProfile from '../views/Thiago/PetsProfile.vue'
import Home4 from '../views/pessoa4/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/home1',
      name: 'home1',
      component: Home1
    },
    {
      path: '/home2',
      name: 'home2',
      component: Home2
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/pets-adocao',
      name: 'PetsList',
      component: PetsList
    },
    {
      path: '/pets-adocao/:id/perfil',
      name: 'PetsProfile',
      component: PetsProfile
    },
    {
      path: '/home4',
      name: 'home4',
      component: Home4
    },
   
  ]
})

export default router
