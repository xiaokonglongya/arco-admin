<script lang="tsx">
import { compile, computed, defineComponent, h } from 'vue'
import { RouteRecordNormalized, RouteRecordRaw, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const goto = (item: RouteRecordRaw) => {
      router.push({
        name: item.name
      })
    }
    const router = useRouter()
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
        if (!_router) return
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
      function travel(_router: (RouteRecordRaw | null)[] | undefined, nodes = []) {
        if (_router) {
          _router.forEach((element) => {
            const icon = element?.meta?.icon ? `<${element?.meta?.icon}/>` : ``
            function vIcon(routerItem: RouteRecordRaw | null) {
              return routerItem?.meta?.icon ? `<${routerItem?.meta?.icon}/>` : ``
            }
            const r = (
              <a-sub-menu
                key={element?.name}
                v-slots={{
                  icon: () => h(compile(vIcon(element))),
                  title: () => h(compile(element?.meta?.label || ''))
                }}
              >
                {element?.children?.map((elem) => {
                  return (
                    <a-menu-item
                      key={elem.name}
                      v-slots={{
                        icon: () => h(compile(vIcon(elem)))
                      }}
                      onClick={() => goto(elem)}
                    >
                      {elem?.meta?.label || ''}
                      {travel(elem.children ?? [])}
                    </a-menu-item>
                  )
                })}
              </a-sub-menu>
            )
            nodes.push(r as never)
          })
          return nodes
        }
      }
      return travel(menuTree.value)
    }
    return () => (
      <a-menu
        auto-open={false}
        style="height: 100%"
        level-indent={34}
        default-open-keys="['0']"
        default-selected-keys="['0_2']"
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
