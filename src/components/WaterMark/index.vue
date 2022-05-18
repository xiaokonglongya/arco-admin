<template>
  <div class="watermark">
    <div class="watermark-content">
      <slot></slot>
    </div>
    <div
      class="watermark-main"
      :style="{
        backgroundSize: props.gapX + props.width + 'px',
        backgroundImage: `url(${base64Url})`
      }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store'
import { computed, ref, onMounted, watch } from 'vue'
import { getPixelRatio } from '@/utils/window'
import useProps from './props'

const appStore = useAppStore()
const theme = computed(() => {
  return appStore.theme
})

const props = defineProps(useProps)
const canvasFontClolor = computed(() => {
  return theme.value === 'light' ? props.fontColor : `rgba(255,255,255,.15)`
})

const base64Url = ref('')
function textToImage(text: string) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const ratio = getPixelRatio(ctx)

  const canvasWidth = `${(props.gapX + props.width) * ratio}px`
  const canvasHeight = `${(props.gapY + props.height) * ratio}px`
  canvas.setAttribute('width', canvasWidth)
  canvas.setAttribute('height', canvasHeight)

  const markHeight = props.height * ratio

  const canvasOffsetLeft = props.offsetLeft ?? props.gapX / 2
  const canvasOffsetTop = props.offsetTop ?? props.gapY / 2

  if (ctx) {
    ctx.translate(canvasOffsetLeft * ratio, canvasOffsetTop * ratio)
    const markSize = Number(props.fontSize) * ratio
    ctx.font = `${props.fontStyle} normal ${props.fontWeight} ${markSize}px/${markHeight}px ${props.fontFamily}`
    ctx.fillStyle = canvasFontClolor.value
    ctx.fillText(text, 0, 0)
    base64Url.value = canvas.toDataURL('image/png', 1)
  }
}
onMounted(() => {
  textToImage(props.context)
})
watch(
  () => theme.value,
  () => {
    textToImage(props.context)
  }
)
</script>

<style lang="less" scoped>
.watermark {
  position: relative;
  &-content {
    position: relative;
    z-index: 10;
  }
  &-main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    cursor: none;
    pointer-events: none;
  }
}
</style>
