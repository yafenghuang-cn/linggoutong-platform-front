import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";

const REMEMBER_KEY = "login_remember_username";

const useLogin = () => {
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

      const redirect =
        typeof route.query.redirect === "string" ? route.query.redirect : "/";
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

  return { handleSubmit, goRegister, form, rules, loading };
};

export default useLogin;
