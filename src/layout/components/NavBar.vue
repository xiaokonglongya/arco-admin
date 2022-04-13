<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <img
          alt="logo"
          src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
        />
        <a-typography-title :style="{ margin: 0, fontSize: '18px' }" :heading="5">
          {{ config.name }}
        </a-typography-title>
      </a-space>
    </div>
    <ul class="right-side">
      <li>
        <a-tooltip :content="`点击切换为${theme === 'dark' ? '亮色' : '暗黑'}模式`">
          <a-button class="right-side-btn" type="outline" :shape="'circle'" @click="toggleTheme">
            <template #icon>
              <icon-moon-fill v-if="theme === 'dark'" />
              <icon-sun-fill v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <UserDrop />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import config from '@/config/index'
import { useAppStore } from '@/store/index'
import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'
import UserDrop from './UserDrop.vue'

const appStore = useAppStore()
const theme = computed(() => {
  return appStore.theme
})
const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(dark: boolean) {
    appStore.toggleTheme(dark)
  }
})
const toggleTheme = useToggle(isDark) as any
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}
.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    padding: 0 12px;
  }
  &-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }
}
</style>
