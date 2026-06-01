import { defineStore } from "pinia";
import { ref } from "vue";

interface LoginForm {
  username: string;
  password: string;
}

interface RegisterForm extends LoginForm {
  email: string;
  phone: string;
}

interface RegisteredUser {
  email: string;
  phone: string;
  password: string;
}

const MOCK_REGISTERED_USERS_KEY = "mock_registered_users";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getRegisteredUsers = (): Record<string, RegisteredUser> => {
  try {
    return JSON.parse(localStorage.getItem(MOCK_REGISTERED_USERS_KEY) || "{}");
  } catch {
    return {};
  }
};

const isEmailRegistered = (email: string, registeredUsers: Record<string, RegisteredUser>) => {
  const normalizedEmail = email.trim().toLowerCase();
  return Object.values(registeredUsers).some((user) => user.email.toLowerCase() === normalizedEmail);
};

export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref("");
    const username = ref("");
    const email = ref("");
    const phone = ref("");

    const login = async (form: LoginForm) => {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const account = form.username.trim();
      const registeredUsers = getRegisteredUsers();
      const registeredUser = registeredUsers[account];

      if (registeredUser) {
        if (registeredUser.password !== form.password) {
          throw new Error("账号或密码错误");
        }
      } else if (!account || form.password.length < 6) {
        throw new Error("账号或密码错误");
      }

      token.value = `mock-token-${Date.now()}`;
      username.value = account;
      email.value = registeredUser?.email || "";
      phone.value = registeredUser?.phone || "";
    };

    const register = async (form: RegisterForm) => {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const account = form.username.trim();
      const userEmail = form.email.trim();

      if (account.length < 3 || account.length > 20) {
        throw new Error("账号长度为 3-20 个字符");
      }

      if (!EMAIL_PATTERN.test(userEmail)) {
        throw new Error("请输入正确的邮箱地址");
      }

      if (!/^1\d{10}$/.test(form.phone)) {
        throw new Error("请输入正确的手机号");
      }

      if (form.password.length < 6 || form.password.length > 20) {
        throw new Error("密码长度为 6-20 位");
      }

      const registeredUsers = getRegisteredUsers();

      if (registeredUsers[account]) {
        throw new Error("该账号已被注册");
      }

      if (isEmailRegistered(userEmail, registeredUsers)) {
        throw new Error("该邮箱已被注册");
      }

      registeredUsers[account] = {
        email: userEmail,
        phone: form.phone,
        password: form.password,
      };

      localStorage.setItem(MOCK_REGISTERED_USERS_KEY, JSON.stringify(registeredUsers));

      token.value = `mock-token-${Date.now()}`;
      username.value = account;
      email.value = userEmail;
      phone.value = form.phone;
    };

    const logout = () => {
      token.value = "";
      username.value = "";
      email.value = "";
      phone.value = "";
    };

    return {
      token,
      username,
      email,
      phone,
      login,
      register,
      logout,
    };
  },
  {
    persist: true,
  },
);
