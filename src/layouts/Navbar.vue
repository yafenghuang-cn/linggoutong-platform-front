<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Expand, Fold, UserFilled } from "@element-plus/icons-vue";

const props = defineProps<{
  collapsed: boolean;
}>();

const emit = defineEmits<{
  "toggle-collapse": [];
}>();

const route = useRoute();

const breadcrumbs = computed(() =>
  route.matched
    .filter((item) => item.meta?.title)
    .map((item) => ({
      title: String(item.meta.title),
      path: item.path,
    })),
);
</script>

<template>
  <header class="app-navbar">
    <div class="app-navbar__left">
      <el-button class="app-navbar__collapse-btn" text @click="emit('toggle-collapse')">
        <el-icon :size="18">
          <Fold v-if="!props.collapsed" />
          <Expand v-else />
        </el-icon>
      </el-button>

      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
          {{ item.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="app-navbar__right">
      <el-dropdown trigger="click">
        <span class="app-navbar__user">
          <el-avatar :size="28" :icon="UserFilled" />
          <span class="app-navbar__username">管理员</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>
