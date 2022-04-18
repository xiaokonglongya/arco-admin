<template>
  <div>
    <a-space direction="vertical" size="large" fill>
      <a-card>
        <a-descriptions :data="useVersion" title="项目信息" align="right" bordered />
      </a-card>
      <a-card>
        <a-descriptions :data="useDependencies" title="生产环境依赖" bordered />
      </a-card>
      <a-card>
        <a-descriptions :data="useDevDependencies" title="开发环境依赖" bordered />
      </a-card>
    </a-space>
  </div>
</template>

<script lang="ts" setup name="About">
import { computed } from 'vue'
import pkg from '../../../package.json'

const { dependencies, devDependencies, version } = pkg

const useVersion = computed(() => {
  return [
    {
      label: '版本',
      value: version
    },
    {
      label: 'GitHub',
      value: 'https://github.com/xiaokonglongya/arco-admin.git'
    }
  ]
})
const useDevDependencies = computed(() => {
  return Object.keys(devDependencies).map((e) => {
    return { label: e, value: (devDependencies as any)[e] }
  })
})

const useDependencies = computed(() => {
  return Object.keys(dependencies).map((e) => {
    return { label: e, value: (dependencies as any)[e] }
  })
})
</script>
