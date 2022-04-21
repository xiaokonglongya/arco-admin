<template>
  <a-card>
    <a-typography>
      <a-typography-title :heading="6"> 编辑器 </a-typography-title>
      <a-typography-paragraph>
        <Tinymec
          :module-value="value"
          :height="300"
          :thems="thems"
          @update:module-value="value = $event"
        />
      </a-typography-paragraph>
      <a-typography-title :heading="6">内容预览</a-typography-title>
      <a-typography-paragraph>
        <div class="content" v-html="value"></div>
      </a-typography-paragraph>
    </a-typography>
    <a-space direction="horizontal" wrap> </a-space>
  </a-card>
</template>

<script lang="ts" setup name="Tinymec">
import Tinymec from '@/components/Tinymce/index.vue'
import { useAppStore } from '@/store'
import { computed, ref } from 'vue'

const appStore = useAppStore()
const thems = computed(() => {
  return appStore.theme === 'dark' ? appStore.theme : 'default'
})
const value = ref('<a href="javascript:alert(&#x27;XSS&#x27;)">跳转...</a>')
// const value = ref('<p style="text-align: center;">Welcome to the TinyMCE demo!</p>')
</script>
