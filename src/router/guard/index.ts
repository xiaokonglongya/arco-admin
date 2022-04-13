import { setRouteMitter } from '@/utils/router-listener'
import type { Router } from 'vue-router'

function setupPageGuard(router: Router) {
  router.beforeEach((to) => {
    setRouteMitter(to)
  })
}

export default function setupRouterGuard(router: Router) {
  setupPageGuard(router)
}
