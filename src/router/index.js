import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')

const router = createRouter({
  history: import.meta.env.PROD ? createWebHashHistory() : createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    }
  ]
})

export default router
