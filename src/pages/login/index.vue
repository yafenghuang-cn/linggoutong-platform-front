<template>
  <div class="auth-page">
    <div class="auth-page__banner">
      <div class="auth-page__banner-inner">
        <div class="auth-page__brand">
          <div class="auth-page__logo">零</div>
          <span class="auth-page__brand-name">零购通平台</span>
        </div>

        <p class="auth-page__slogan">
          面向企业的数字化运营管理平台，助力业务高效协同与数据驱动决策。
        </p>

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
            <el-input
              v-model="form.username"
              placeholder="账号：admin"
              :prefix-icon="User"
            />
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

          <el-button
            class="auth-page__submit"
            type="primary"
            :loading="loading"
            @click="handleSubmit"
          >
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

<script setup lang="ts">
import { Lock, User } from "@element-plus/icons-vue";
import useLogin from "./useLogin";

const { handleSubmit, goRegister, form, rules, loading } = useLogin();

</script>

<style lang="scss" src="@/styles/auth.scss"></style>
