import type { Component } from "vue";
import { House, User } from "@element-plus/icons-vue";

export interface AppMenuItem {
  path: string;
  title: string;
  icon: Component;
}

export const appMenuItems: AppMenuItem[] = [
  { path: "/", title: "首页", icon: House },
  { path: "/mine", title: "个人中心", icon: User },
];
