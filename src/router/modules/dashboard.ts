export default {
  path: 'dashboard',
  name: 'dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    label: '首页',
    requiresAuth: true,
    icon: 'icon-apps',
    order: 0
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        label: '工作台',
        icon: 'icon-dashboard'
      }
    },
    {
      path: 'monitor',
      name: 'monitor',
      component: () => import('@/views/dashboard/monitor/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        label: '监控台',
        icon: 'icon-dashboard'
      }
    }
  ]
}
