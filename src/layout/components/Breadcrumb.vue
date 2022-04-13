<template>
  <div v-if="hiddenBread" class="breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <icon-home />
      </a-breadcrumb-item>
      <a-breadcrumb-item v-for="item in menus" :key="item.name" @click="goItem(item)">
        {{ item.meta.label }}
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { listenerRouterChange } from '@/utils/router-listener'
import { computed, ref } from 'vue'
import { RouteLocationNormalized, RouteRecordRaw, useRouter } from 'vue-router'

const router = useRouter()
const menus = ref<RouteLocationNormalized['matched']>([])
listenerRouterChange((changeRouter) => {
  if (changeRouter) {
    menus.value = changeRouter.matched.map((e) => {
      return e
    })
    menus.value?.shift()
  }
}, true)
const hiddenBread = computed(() => {
  const result = menus.value.find((e) => e.meta.hideBread === true)
  return !result
})
const goItem = (item: RouteRecordRaw) => {
  if (item.name) {
    // router.push({ name: item.name })
  }
}
</script>

<style lang="less" scoped>
.breadcrumb {
  background-color: var(--color-fill-2);
  padding: 16px 20px 0;
  user-select: none;
}
</style>
