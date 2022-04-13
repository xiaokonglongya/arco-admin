export default {
  path: 'about',
  name: 'about',
  component: () => import('@/views/about/index.vue'),
  meta: {
    label: '关于',
    requiresAuth: true,
    icon: 'icon-apps',
    order: 10
  }
}
