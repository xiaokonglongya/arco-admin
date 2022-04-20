export default {
  path: 'components',
  name: 'Components',
  component: () => import('@/views/components/index.vue'),
  meta: {
    label: '组件',
    requiresAuth: true,
    icon: 'icon-apps',
    order: 6
  },
  children: [
    {
      path: 'tinymce',
      name: 'Tinymce',
      component: () => import('@/views/components/tinymce/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        label: '富文本',
        icon: 'icon-dashboard'
      }
    }
  ]
}
