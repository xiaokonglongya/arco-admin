import { AppState } from '@/store/modules/app/types'
/**
 * 默认配置
 */
const defaultSettings: AppState = {
  theme: 'light',
  colorWeek: false,
  navbar: true,
  menu: true,
  hideMenu: false,
  menuCollapse: false,
  footer: true,
  themeColor: '#165DFF',
  menuWidth: 220,
  globalSettings: false,
  device: 'desktop',
  tabBar: false
}
export default defaultSettings
