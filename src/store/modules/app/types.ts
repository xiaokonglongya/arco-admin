export interface AppState {
  theme: 'light' | 'dark'
  colorWeek: boolean
  navbar: boolean
  menu: boolean
  hideMenu: boolean
  menuCollapse: boolean
  footer: boolean
  themeColor: string
  menuWidth: number
  globalSettings: boolean
  device: string
  tabBar: boolean
  [key: string]: unknown
}
