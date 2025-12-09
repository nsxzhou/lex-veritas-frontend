/**
 * 认证相关 Hook
 * 封装认证状态和常用操作
 */

import { useAuthStore } from "@/stores/authStore";

export function useAuth() {
  const store = useAuthStore();

  return {
    // 状态
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isInitialized: store.isInitialized,
    accessToken: store.accessToken,

    // 计算属性
    isAdmin: store.user?.role === "admin" || store.user?.role === "super_admin",
    isSuperAdmin: store.user?.role === "super_admin",
    isUser: store.user?.role === "user",

    // 操作
    login: store.login,
    loginByPhone: store.loginByPhone,
    logout: store.logout,
    refreshAccessToken: store.refreshAccessToken,
  };
}
