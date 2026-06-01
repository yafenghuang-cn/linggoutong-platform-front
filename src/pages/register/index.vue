<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Iphone, Lock, Message, User } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

const formRef = ref<FormInstance>();
const loading = ref(false);

const form = reactive({
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agreement: false,
});

const validateConfirmPassword = (_rule: unknown, value: string, callback: (error?: Error) => void) => {
  if (!value) {
    callback(new Error("请再次输入密码"));
    return;
  }

  if (value !== form.password) {
    callback(new Error("两次输入的密码不一致"));
    return;
  }

  callback();
};

const validateAgreement = (_rule: unknown, value: boolean, callback: (error?: Error) => void) => {
  if (!value) {
    callback(new Error("请先阅读并同意用户协议"));
    return;
  }

  callback();
};

const rules: FormRules = {
  username: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 3, max: 20, message: "账号长度为 3-20 个字符", trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { pattern: /^1\d{10}$/, message: "请输入正确的手机号", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度为 6-20 位", trigger: "blur" },
  ],
  confirmPassword: [{ required: true, validator: validateConfirmPassword, trigger: "blur" }],
  agreement: [{ validator: validateAgreement, trigger: "change" }],
};

const handleSubmit = async () => {
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) return;

  loading.value = true;

  try {
    await userStore.register({
      username: form.username,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });

    ElMessage.success("注册成功，已自动登录");
    router.replace("/");
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : "注册失败，请稍后重试");
  } finally {
    loading.value = false;
  }
};

const goLogin = () => {
  router.push("/login");
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

        <p class="auth-page__slogan">注册企业账号，开启高效协同与智能运营管理之旅。</p>

        <div class="auth-page__features">
          <div class="auth-page__feature-item">快速开通，即刻使用平台核心能力</div>
          <div class="auth-page__feature-item">企业级安全保障与权限隔离</div>
          <div class="auth-page__feature-item">7×24 小时技术支持与服务</div>
        </div>
      </div>
    </div>

    <div class="auth-page__content">
      <div class="auth-page__form-wrap">
        <h1 class="auth-page__title">注册</h1>
        <p class="auth-page__subtitle">创建您的零购通平台账号</p>

        <el-form
          ref="formRef"
          class="auth-page__form"
          :model="form"
          :rules="rules"
          size="large"
          @submit.prevent="handleSubmit"
        >
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="账号：3-20 个字符" :prefix-icon="User" />
          </el-form-item>

          <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="邮箱" :prefix-icon="Message" />
          </el-form-item>

          <el-form-item prop="phone">
            <el-input v-model="form.phone" placeholder="手机号" maxlength="11" :prefix-icon="Iphone" />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="密码：6-20 位"
              show-password
              :prefix-icon="Lock"
            />
          </el-form-item>

          <el-form-item prop="confirmPassword">
            <el-input
              v-model="form.confirmPassword"
              type="password"
              placeholder="确认密码"
              show-password
              :prefix-icon="Lock"
              @keyup.enter="handleSubmit"
            />
          </el-form-item>

          <el-form-item prop="agreement" class="auth-page__agreement">
            <el-checkbox v-model="form.agreement">
              我已阅读并同意
              <a class="auth-page__link" @click.prevent>《用户服务协议》</a>
              和
              <a class="auth-page__link" @click.prevent>《隐私政策》</a>
            </el-checkbox>
          </el-form-item>

          <el-button class="auth-page__submit" type="primary" :loading="loading" @click="handleSubmit">
            注册
          </el-button>

          <div class="auth-page__switch">
            已有账号？
            <a class="auth-page__link" @click.prevent="goLogin">立即登录</a>
          </div>
        </el-form>
      </div>

      <footer class="auth-page__footer">零购通平台 ©2026</footer>
    </div>
  </div>
</template>

<style lang="scss" src="@/styles/auth.scss"></style>
