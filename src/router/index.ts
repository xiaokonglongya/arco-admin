import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import Login from './modules/login'
import appRoutes from './modules'

const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  Login,
  {
    name: 'root',
    path: '/',
    component: Layout,
    children: appRoutes
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRoutes],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router