<template>
  <a-card>
    <a-space wrap :size="32">
      <Component :is="icon" v-for="icon in getIcons" :key="icon" :size="32" :stroke-width="2" />
    </a-space>
  </a-card>
</template>

<script setup name="Icon" lang="ts">
import icons from '@arco-design/web-vue/es/icon'
import { computed } from 'vue'

const getIcons = computed(() => {
  return Object.keys(icons)
})
</script>
