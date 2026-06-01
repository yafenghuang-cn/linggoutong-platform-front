<template>
  <div>首页</div>
  <el-button type="primary" @click="goLogin">去登录页面</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router"
const router = useRouter();

const goLogin = () => {
  router.push('/login');
};

</script>
