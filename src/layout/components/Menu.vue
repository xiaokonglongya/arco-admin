<script lang="tsx">
import { listenerRouterChange } from '@/utils/router-listener'
import { compile, computed, defineComponent, h, ref } from 'vue'
import { RouteRecordNormalized, RouteRecordRaw, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()

    const goto = (item?: RouteRecordRaw | null) => {
      if (!item) return
      router.push({
        name: item.name
      })
    }
    /**
     * 拿到本地路由表中所有的路由数据
     */
    const appRoute = computed(() => {
      return router.getRoutes().find((el) => el.name === 'root') as RouteRecordNormalized
    })

    const menuTree = computed(() => {
      // 快速实现深拷贝
      const copyRouter = JSON.parse(
        JSON.stringify(appRoute.value.children)
      ) as RouteRecordNormalized[]
      // 根据order 进行排序，如果需要从后台返回排序修改这里排序规则即可
      copyRouter.sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0))

      function travel(_router: RouteRecordRaw[], layer: number) {
        if (!_router) return null
        const collector = _router.map((element) => {
          // 如果没有跟节点，代表已经是最字集了
          if (!element.children) {
            return element
          }
          // 将需要隐藏的菜单进行排除
          element.children = element.children.filter((e) => e.meta?.hideInMenu !== true)
          const subItem: any = travel(element.children, layer)
          if (subItem.length) {
            element.children = subItem
            return element
          }
          if (layer > 1) {
            element.children = subItem
            return element
          }
          if (element.meta?.hideInMenu === false) {
            return element
          }
          return null
        })
        return collector.filter(Boolean)
      }
      return travel(copyRouter, 0)
    })
    const renderSubMenu = () => {
      function travel(_router: RouteRecordRaw[], nodes = []) {
        if (!_router) return []
        _router.forEach((element) => {
          function vIcon(routerItem: RouteRecordRaw | null) {
            return routerItem?.meta?.icon ? `<${routerItem?.meta?.icon}/>` : ``
          }
          const r = element?.children ? (
            <a-sub-menu
              key={element?.name}
              v-slots={{
                icon: () => h(compile(vIcon(element))),
                title: () => h(compile(element?.meta?.label || ''))
              }}
            >
              {travel(element.children)}
            </a-sub-menu>
          ) : (
            <a-menu-item
              key={element?.name}
              v-slots={{
                icon: () => h(compile(vIcon(element)))
              }}
              onClick={() => goto(element)}
            >
              {element?.meta?.label || ''}
            </a-menu-item>
          )
          nodes.push(r as never)
        })
        return nodes
      }
      return travel(menuTree.value as RouteRecordRaw[])
    }
    const selectKey = ref<string[]>([])
    listenerRouterChange((changeRouter) => {
      const cloneChangeRouter = JSON.parse(JSON.stringify(changeRouter))
      const lastRouteMatched = cloneChangeRouter.matched.pop()
      if (!changeRouter.meta.hideInMenu) {
        const key = lastRouteMatched?.name as string
        selectKey.value = [key]
      }
    })
    return () => (
      <a-menu
        auto-open={false}
        style="height: 100%"
        level-indent={10}
        selected-keys={selectKey.value}
        auto-open-selected={true}
      >
        {renderSubMenu()}
      </a-menu>
    )
  }
})
</script>

<style lang="less" scoped>
:deep(.arco-menu-inner) {
  .arco-menu-inline-header {
    display: flex;
    align-items: center;
  }
  .arco-icon {
    &:not(.arco-icon-down) {
      font-size: 18px;
    }
  }
}
</style>
