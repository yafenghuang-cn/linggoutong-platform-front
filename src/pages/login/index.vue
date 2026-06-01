<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Lock, User } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";

const REMEMBER_KEY = "login_remember_username";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const formRef = ref<FormInstance>();
const loading = ref(false);

const form = reactive({
  username: localStorage.getItem(REMEMBER_KEY) || "",
  password: "",
  remember: Boolean(localStorage.getItem(REMEMBER_KEY)),
});

const rules: FormRules = {
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度不能少于 6 位", trigger: "blur" },
  ],
};

const handleSubmit = async () => {
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) return;

  loading.value = true;

  try {
    await userStore.login({
      username: form.username,
      password: form.password,
    });

    if (form.remember) {
      localStorage.setItem(REMEMBER_KEY, form.username.trim());
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }

    ElMessage.success("登录成功");

    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/";
    router.replace(redirect);
  } catch {
    ElMessage.error("账号或密码错误");
  } finally {
    loading.value = false;
  }
};

const goRegister = () => {
  router.push("/register");
};
</script>

<template>
  <div class="auth-page">
    <div class="auth-page__banner">
      <div class="auth-page__banner-inner">
        <div class="auth-page__brand">
          <div class="auth-page__logo">零</div>
          <span class="auth-page__brand-name">零购通平台</span>
        </div>

        <p class="auth-page__slogan">面向企业的数字化运营管理平台，助力业务高效协同与数据驱动决策。</p>

        <div class="auth-page__features">
          <div class="auth-page__feature-item">统一权限与组织架构管理</div>
          <div class="auth-page__feature-item">多维度数据看板与报表分析</div>
          <div class="auth-page__feature-item">安全稳定的金融级系统架构</div>
        </div>
      </div>
    </div>

    <div class="auth-page__content">
      <div class="auth-page__form-wrap">
        <h1 class="auth-page__title">登录</h1>
        <p class="auth-page__subtitle">欢迎回来，请登录您的账号</p>

        <el-form
          ref="formRef"
          class="auth-page__form"
          :model="form"
          :rules="rules"
          size="large"
          @submit.prevent="handleSubmit"
        >
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="账号：admin" :prefix-icon="User" />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="密码：至少 6 位"
              show-password
              :prefix-icon="Lock"
              @keyup.enter="handleSubmit"
            />
          </el-form-item>

          <div class="auth-page__options">
            <el-checkbox v-model="form.remember">自动登录</el-checkbox>
            <a class="auth-page__link">忘记密码</a>
          </div>

          <el-button class="auth-page__submit" type="primary" :loading="loading" @click="handleSubmit">
            登录
          </el-button>

          <div class="auth-page__switch">
            还没有账号？
            <a class="auth-page__link" @click.prevent="goRegister">立即注册</a>
          </div>
        </el-form>
      </div>

      <footer class="auth-page__footer">零购通平台 ©2026</footer>
    </div>
  </div>
</template>

<style lang="scss" src="@/styles/auth.scss"></style>
