<template>
  <div>
    <a-card title="欢迎回来！小恐龙">
      <a-space direction="vertical" :size="24" style="display: block">
        <a-row class="grid-demo">
          <a-col :span="6">
            <a-statistic
              title="总用户"
              :value="1023032"
              show-group-separator
              :value-from="0"
              :start="true"
              animation
            >
              <template #suffix>个</template>
            </a-statistic>
          </a-col>
          <a-col :span="6">
            <a-statistic
              title="新用户"
              :value="9999"
              show-group-separator
              :value-from="0"
              :start="true"
              animation
            >
              <template #suffix>个</template>
            </a-statistic>
          </a-col>
          <a-col :span="6">
            <a-statistic
              title="较昨日增长"
              :value="(9999 / 1023) * 100"
              show-group-separator
              :value-from="0"
              :start="true"
              animation
            >
              <template #suffix>个</template>
            </a-statistic>
          </a-col>
          <a-col :span="6">
            <div>6 - 25%</div>
          </a-col>
        </a-row>
      </a-space>
    </a-card>
  </div>
</template>
