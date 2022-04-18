export default {
  path: '/icon',
  name: 'Icon',
  component: () => import('@/views/icon/index.vue'),
  meta: {
    requiresAuth: false,
    label: '图标',
    icon: 'icon-apps',
    order: 0
  }
}
