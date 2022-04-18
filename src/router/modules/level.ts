export default {
  path: 'level',
  name: 'Level',
  component: () => import('@/views/level/index.vue'),
  meta: {
    label: '多级菜单',
    requiresAuth: true,
    icon: 'icon-apps',
    order: 0
  },
  children: [
    {
      path: 'menu-1',
      name: 'Menu1',
      component: () => import('@/views/level/menu1/index.vue'),
      meta: {
        label: '多级菜单-1',
        requiresAuth: true,
        icon: 'icon-apps',
        order: 0
      },
      children: [
        {
          path: 'menu-1-2',
          name: 'Menu12',
          component: () => import('@/views/level/menu1/menu1-2/index.vue'),
          meta: {
            label: '多级菜单-1-2',
            requiresAuth: true,
            icon: 'icon-apps',
            order: 0
          }
        }
      ]
    },
    {
      path: 'menu-2',
      name: 'Menu2',
      component: () => import('@/views/level/menu2/index.vue'),
      meta: {
        label: '多级菜单-2',
        requiresAuth: true,
        icon: 'icon-apps',
        order: 0
      }
    }
  ]
}
