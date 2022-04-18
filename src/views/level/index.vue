<template>
  <a-card>
    <a-space>
      <div>menu1</div>
      <router-view />
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Level',

  setup() {
    const value = ref()
    return {
      value
    }
  }
})
</script>
