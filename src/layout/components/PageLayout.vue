<template>
  <div class="container">
    <router-view v-slot="{ Component, route }">
      <transition name="scale" mode="out-in" appear>
        <component :is="Component" v-if="route.meta.ignoreCache" :key="route.fullPath" />
        <keep-alive v-else :include="cacheList">
          <Component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup name="ParentLayout">
import { computed } from 'vue'
import { useTabBarState } from '@/store/index'

const tabBarStore = useTabBarState()
const cacheList = computed(() => {
  return tabBarStore.getCacheList
})
</script>

<style lang="less" scoped>
.container {
  padding: 16px 20px;
  background-color: var(--color-fill-2);
  height: 100%;
  color: var(--color-text-1);
}
.scale-enter-active {
  transition: all 0.5s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.99);
}
</style>
