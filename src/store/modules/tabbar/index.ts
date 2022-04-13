import { defineStore } from 'pinia'
import { RouteLocationNormalized } from 'vue-router'
import { TabBarState, TagProps } from './types'

const pipeTag = (route: RouteLocationNormalized) => {
  const { name, meta, fullPath, query } = route
  return { title: meta.label || '', name: String(name), fullPath, query, icon: meta.icon }
}
const useTabBarState = defineStore('tabBar', {
  state: (): TabBarState => ({
    tagList: [],
    cacheTabList: new Set()
  }),
  getters: {
    getTabList(): TagProps[] {
      return this.tagList
    },
    getCacheList(): string[] {
      return Array.from(this.cacheTabList)
    }
  },
  actions: {
    updateTableList(route: RouteLocationNormalized) {
      this.tagList.push(pipeTag(route))
      this.cacheTabList.add(route.name as string)
    },
    deleteTag(idx: number, tag: TagProps) {
      this.tagList.splice(idx, 1)
      this.cacheTabList.delete(tag.name)
    }
  }
})
export default useTabBarState
