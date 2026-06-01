<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { appMenuItems } from "./menu";

defineProps<{
  collapsed: boolean;
}>();

const route = useRoute();
const activeMenu = computed(() => route.path);
</script>

<template>
  <aside class="app-sidebar">
    <div class="app-sidebar__logo">
      <img src="@/assets/vue.svg" alt="logo" class="app-sidebar__logo-icon" />
      <span v-show="!collapsed" class="app-sidebar__logo-text">零购通平台</span>
    </div>

    <el-scrollbar class="app-sidebar__menu-wrap">
      <el-menu
        :default-active="activeMenu"
        :collapse="collapsed"
        :collapse-transition="false"
        router
        class="app-sidebar__menu"
      >
        <el-menu-item v-for="item in appMenuItems" :key="item.path" :index="item.path">
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </aside>
</template>

<style scoped lang="scss">
.app-sidebar__menu :deep(.el-menu-item.is-active) {
  background-color: #1890ff;
}
</style>
