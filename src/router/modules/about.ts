export default {
  path: 'about',
  name: 'About',
  component: () => import('@/views/about/index.vue'),
  meta: {
    label: '关于',
    requiresAuth: true,
    icon: 'icon-exclamation-circle',
    order: 10
  }
}
