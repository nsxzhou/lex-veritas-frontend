/**
 * 认证状态管理 Store
 */

import { create } from "zustand";
import type { UserResponse, LoginResponse, TokenPair } from "@/types";
import { authApi } from "@/api/auth";

interface AuthState {
  user: UserResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  loginByPhone: (phone: string, code: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  setUser: (user: UserResponse) => void;
  initialize: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  // 初始状态
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isInitialized: false,

  // 邮箱密码登录
  login: async (email: string, password: string) => {
    const response: LoginResponse = await authApi.login({ email, password });

    // 保存 Token
    localStorage.setItem("accessToken", response.token.accessToken);
    localStorage.setItem("refreshToken", response.token.refreshToken);

    // 更新状态
    set({
      user: response.user,
      accessToken: response.token.accessToken,
      refreshToken: response.token.refreshToken,
      isAuthenticated: true,
    });
  },

  // 手机验证码登录
  loginByPhone: async (phone: string, code: string) => {
    const response: LoginResponse = await authApi.loginByPhone({ phone, code });

    // 保存 Token
    localStorage.setItem("accessToken", response.token.accessToken);
    localStorage.setItem("refreshToken", response.token.refreshToken);

    // 更新状态
    set({
      user: response.user,
      accessToken: response.token.accessToken,
      refreshToken: response.token.refreshToken,
      isAuthenticated: true,
    });
  },

  // 登出
  logout: () => {
    // 清除 localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // 尝试调用后端登出接口（不阻塞）
    authApi.logout().catch(() => {
      // 忽略错误，即使失败也继续登出
    });

    // 重置状态
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isInitialized: true, // 保持初始化状态
    });
  },

  // 刷新 Token
  refreshAccessToken: async () => {
    const { refreshToken } = get();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const tokenPair: TokenPair = await authApi.refresh({ refreshToken });

    // 更新 Token
    localStorage.setItem("accessToken", tokenPair.accessToken);
    localStorage.setItem("refreshToken", tokenPair.refreshToken);

    set({
      accessToken: tokenPair.accessToken,
      refreshToken: tokenPair.refreshToken,
    });
  },

  // 设置用户信息
  setUser: (user: UserResponse) => {
    set({ user });
  },

  // 初始化：从 localStorage 恢复登录状态
  initialize: async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      // 先恢复 Token
      set({
        accessToken,
        refreshToken,
      });

      try {
        // 尝试获取用户信息
        const user = await authApi.getCurrentUser();
        set({
          user,
          isAuthenticated: true,
          isInitialized: true,
        });
      } catch {
        // 获取用户信息失败，尝试刷新 Token
        try {
          await get().refreshAccessToken();
          const user = await authApi.getCurrentUser();
          set({
            user,
            isAuthenticated: true,
            isInitialized: true,
          });
        } catch {
          // 刷新失败，清除登录状态
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isInitialized: true,
          });
        }
      }
    } else {
      set({ isInitialized: true });
    }
  },
}));
