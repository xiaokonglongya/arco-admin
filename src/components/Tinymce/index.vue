<template>
  <div class="tinymce-container">
    <textarea :id="props.id" class="tinymce-textarea" />
    <div class="editor-custom-btn-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'
import loadTinymec from './load'
import plugins from './plugins'
import toolbar from './toolbar'
import addZh from './langs/zh_CN'

const props = defineProps({
  id: {
    type: String,
    default() {
      return `vue-tinymce-${+new Date()}${(Math.random() * 1000).toFixed(0)}`
    }
  },
  moduleValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits<{
  (event: 'update:moduleValue', message: string): void
}>()

const isInit = ref(false)
const isChange = ref(false)

const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce@5.10.3/tinymce.min.js'
const init = () => {
  addZh()
  window.tinymce.init({
    selector: `#${props.id}`,
    skin: 'oxide-dark',
    content_css: 'dark',
    language: 'zh_CN',
    body_class: 'panel-body ',
    object_resizing: false,
    toolbar,
    plugins,
    end_container_on_empty_block: true,
    advlist_number_styles: 'default',
    imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
    init_instance_callback: (editor) => {
      if (props.moduleValue) {
        editor.setContent(props.moduleValue)
      }
      isInit.value = true
      editor.on('NodeChange Change KeyUp SetContent', () => {
        isChange.value = true
        const newContent = editor.getContent()
        emit('update:moduleValue', newContent)
      })
    },
    convert_urls: false
  })
}

const destroyTinymce = () => {
  const tinymce = window.tinymce.get(props.id)
  if (tinymce) {
    tinymce.destroy()
  }
}
onMounted(() => {
  if (window.tinymce) {
    init()
    return
  }
  loadTinymec(tinymceCDN, (message) => {
    if (message) {
      Message.error(String(message))
      return
    }
    init()
  })
})
onUnmounted(() => {
  destroyTinymce()
})
onActivated(() => {
  if (window.tinymce) {
    init()
  }
})
onDeactivated(() => {
  destroyTinymce()
})
</script>

<style lang="less">
.tinymce-container {
  background-color: inherit;
  /deep/ .mce-tinymce {
    background-color: inherit;
  }
}
</style>
