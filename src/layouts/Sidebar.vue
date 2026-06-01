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
      <div class="app-sidebar__logo-mark">零</div>
      <div v-show="!collapsed" class="app-sidebar__logo-text">
        <span class="app-sidebar__logo-title">零购通平台</span>
        <span class="app-sidebar__logo-subtitle">Enterprise Console</span>
      </div>
    </div>

    <el-scrollbar class="app-sidebar__menu-wrap">
      <div v-show="!collapsed" class="app-sidebar__section">主导航</div>

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
