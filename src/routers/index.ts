import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import RootLayout from "@/layouts/index.vue";

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/login/index.vue"),
    meta: { title: "登录", requiresAuth: false },
  },
  {
    path: "/",
    component: RootLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/pages/home/index.vue"),
        meta: { title: "首页" },
      },
      {
        path: "/mine",
        name: "Mine",
        component: () => import("@/pages/mine/index.vue"),
        meta: { title: "个人中心", requiresAuth: true },
      },
    ],
  },
  {
    // 404 兜底路由
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/NotFound/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
