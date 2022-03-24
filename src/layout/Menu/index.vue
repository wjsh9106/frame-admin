<template>
  <el-menu
    active-text-color="#ffd04b  "
    background-color="#304156"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    router
    unique-opened
    :collapse="!$store.getters.siderType"
  >
    <el-sub-menu :index="item.id" v-for="item in menusList" :key="item.id">
      <template #title>
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
      <el-menu-item
        :index="it.path"
        v-for="it in item.children"
        :key="it.id"
        @click="savePath(it.path)"
      >
        <el-icon>
          <component :is="it.icon" />
        </el-icon>
        {{ $t(`menus.${it.path.replace('\/', '')}`) }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { leftMenus } from '@/api/menu'
import { ref } from 'vue'

const defaultActive = ref(sessionStorage.getItem('path') || '/user')
const menusList = ref([])
const initMenusList = async () => {
  menusList.value = await leftMenus()
}
initMenusList()

const savePath = (path) => {
  sessionStorage.setItem('path', `${path}`)
}
</script>
<style lang="scss" scoped></style>
