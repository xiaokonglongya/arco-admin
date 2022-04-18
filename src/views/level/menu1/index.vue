<template>
  <a-card>
    <a-space>
      <div>menu1-2</div>
      <router-view> </router-view>
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Menu1',
  setup() {
    const value = ref()
    return {
      value
    }
  }
})
</script>
