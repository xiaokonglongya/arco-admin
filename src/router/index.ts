import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import setupRouterGuard from './guard/index'
import Login from './modules/login'
import appRoutes from './modules'

const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard/workplace'
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
setupRouterGuard(router)
export default router
