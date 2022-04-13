import { createPinia } from 'pinia'

export { default as useAppStore } from './modules/app'
export { default as useTabBarState } from './modules/tabbar'
const pinia = createPinia()
export default pinia
