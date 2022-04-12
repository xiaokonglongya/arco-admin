<template>
  <a-layout class="layout">
    <div class="layout-navbar">
      <nav-bar />
    </div>
    <a-layout>
      <a-layout>
        <a-layout-sider class="layout-sider" :style="{ paddingTop: '60px' }">
          <Menu />
        </a-layout-sider>
        <a-layout class="layout-content" :style="paddingStyle">
          <a-layout-content>
            <page-layout />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import PageLayout from './components/PageLayout.vue'
import NavBar from './components/NavBar.vue'
import Menu from './components/Menu.vue'
const paddingStyle = computed(() => {
  return {
    paddingLeft: '200px',
    paddingTop: '60px'
  }
})
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  &-navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: @nav-size-height;
  }
  &-sider {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    height: 100%;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    &::after {
      position: absolute;
      top: 0;
      right: -1px;
      display: block;
      width: 1px;
      height: 100%;
      background-color: var(--color-border);
      content: '';
    }

    > :deep(.arco-layout-sider-children) {
      overflow-y: hidden;
    }
  }
  &-content {
    min-height: 100vh;
    overflow-y: hidden;
    background-color: var(--color-fill-2);
    transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
}
</style>
