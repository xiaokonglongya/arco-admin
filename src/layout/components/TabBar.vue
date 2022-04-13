<template>
  <div class="tabbar">
    <div class="tabbar-list">
      <div
        v-for="(tag, index) in tagList"
        :key="tag.fullPath"
        class="tag"
        :class="{
          'tag-checked': checkRoute.fullPath == tag.fullPath
        }"
        @click="goto(tag)"
      >
        <Component :is="tag.icon" v-if="tag.icon" :size="16" />
        <span class="tag-title">
          {{ tag.title }}
        </span>
        <icon-close
          v-if="index !== 0"
          class="tag-close"
          :size="14"
          @click.stop="removeTag(index, tag)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTabBarState } from '@/store'
import { TagProps } from '@/store/modules/tabbar/types'
import { listenerRouterChange } from '@/utils/router-listener'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const tabBarStore = useTabBarState()
const checkRoute = ref()
const tagList = computed(() => {
  return tabBarStore.getTabList
})

listenerRouterChange((route) => {
  checkRoute.value = route

  if (!route.meta.noAffix && !tagList.value.some((tag) => tag.fullPath === route.fullPath)) {
    tabBarStore.updateTableList(route)
  }
}, true)
const removeTag = (index: number, tag: TagProps) => {
  tabBarStore.deleteTag(index, tag)
}
const goto = (tag: TagProps) => {
  router.push({
    ...tag
  })
}
</script>

<style lang="less" scoped>
.tabbar {
  color: var(--color-text-1);
  padding: 10px 10px 0;
  background-color: var(--color-bg-2);
  display: flex;
  align-content: center;
  user-select: none;
  &-list {
    display: flex;
    .tag {
      cursor: pointer;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      position: relative;
      transition: all 0.3s;
      border-radius: 6px 6px 0 0;
      &-close {
        transition: background-color 0.3s;
        border-radius: 50%;

        &:hover {
          background-color: rgb(var(--gray-6));
        }
      }
      &:last-child {
        &::after {
          display: none;
        }
      }

      &:hover {
        background-color: rgb(var(--gray-3));
      }
      &-checked {
        background-color: rgb(var(--primary-1));
        .tag-close {
          color: rgb(var(--primary-4));
          &:hover {
            background-color: rgb(var(--primary-6));
          }
        }
        &:hover {
          background-color: rgb(var(--primary-1));
        }
      }
      &-title {
        margin-left: 8px;
        color: var(--color-text-1);
      }
      &-close {
        margin-left: 20px;
      }
    }
  }
}
</style>
