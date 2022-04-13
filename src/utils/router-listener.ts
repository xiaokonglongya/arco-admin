import mitt, { Handler } from 'mitt'
import type { RouteLocationNormalized } from 'vue-router'

const emitMitt = mitt()
const Key = Symbol('ROUTER_CHANGE')
let latestRouter: RouteLocationNormalized | null = null

export function setRouteMitter(to: RouteLocationNormalized) {
  emitMitt.emit(Key, to)
  latestRouter = to
}

export function listenerRouterChange(
  handler: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  emitMitt.on(Key, handler as Handler)
  if (immediate && latestRouter) {
    handler(latestRouter)
  }
}

export function removeRouterListener() {
  emitMitt.off(Key)
}

export default {
  setRouteMitter
}
