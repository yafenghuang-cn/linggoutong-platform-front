<script setup lang="ts">
import { ref } from "vue";
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";

const collapsed = ref(false);

const toggleCollapse = () => {
  collapsed.value = !collapsed.value;
};
</script>

<template>
  <div class="app-layout" :class="{ 'is-collapsed': collapsed }">
    <Sidebar :collapsed="collapsed" />

    <div class="app-layout__main">
      <Navbar :collapsed="collapsed" @toggle-collapse="toggleCollapse" />

      <main class="app-layout__content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style lang="scss" src="@/styles/appLayout.scss"></style>
