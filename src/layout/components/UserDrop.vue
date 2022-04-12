<template>
  <a-dropdown trigger="hover">
    <a-avatar :size="32">
      <img alt="avatar" src="https://q1.qlogo.cn/g?b=qq&nk=1363931801&s=100" />
    </a-avatar>
    <template #content>
      <a-doption>
        <a-space @click="switchRoles">
          <icon-tag />
          <span> 切换角色 </span>
        </a-space>
      </a-doption>
      <a-doption>
        <a-space @click="$router.push({ name: 'setting' })">
          <icon-settings />
          <span> 用户设置 </span>
        </a-space>
      </a-doption>
      <a-doption>
        <a-space @click="handleLogout">
          <icon-export />
          <span> 退出登录 </span>
        </a-space>
      </a-doption>
    </template>
  </a-dropdown>
</template>
<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'

const switchRoles = () => {
  Message.info('切换角色')
}
const handleLogout = () => {
  Message.info('退出登陆')
}
</script>
