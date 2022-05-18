<template>
  <a-card>
    水印
    <WaterMark>
      <div class="content">
        <p v-for="item in 10" :key="item">水印内容区域{{ item }}</p>
      </div>
    </WaterMark>
  </a-card>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store'
import { computed, ref } from 'vue'
import WaterMark from '@/components/WaterMark/index.vue'
</script>

<style lang="less" scoped>
.content {
  height: 500px;
}
</style>
