<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { ref } from 'vue'
import { ElConfigProvider } from 'element-plus'
// 中文包
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const locale = ref(zhCn)
</script>

<style lang="scss">
.el-message-box__status {
  position: absolute !important;
}
</style>
