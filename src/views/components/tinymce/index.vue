<template>
  <a-card>
    <a-typography>
      <a-typography-title :heading="6"> 编辑器 </a-typography-title>
      <a-typography-paragraph>
        <Tinymec :module-value="value" @update:module-value="value = $event" />
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
import { ref } from 'vue'

const value = ref('<p style="text-align: center;">Welcome to the TinyMCE demo!</p>')
</script>
