export interface TagProps {
  title: string
  name: string
  fullPath: string
  query?: any
  icon?: string
}
export interface TabBarState {
  tagList: TagProps[]
  cacheTabList: Set<string>
}
