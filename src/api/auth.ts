/**
 * 用户认证 API
 */

import { apiClient } from "./client";
import type { User } from "@/types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface PhoneLoginRequest {
  phone: string;
  code: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authApi = {
  /**
   * 邮箱密码登录
   */
  login: (data: LoginRequest): Promise<AuthResponse> => {
    return apiClient.post("/auth/login", data);
  },

  /**
   * 手机验证码登录
   */
  loginByPhone: (data: PhoneLoginRequest): Promise<AuthResponse> => {
    return apiClient.post("/auth/login/phone", data);
  },

  /**
   * 发送验证码
   */
  sendVerifyCode: (phone: string): Promise<{ success: boolean }> => {
    return apiClient.post("/auth/send-code", { phone });
  },

  /**
   * 用户注册
   */
  register: (data: RegisterRequest): Promise<AuthResponse> => {
    return apiClient.post("/auth/register", data);
  },

  /**
   * 退出登录
   */
  logout: (): Promise<void> => {
    return apiClient.post("/auth/logout");
  },

  /**
   * 获取当前用户信息
   */
  getCurrentUser: (): Promise<User> => {
    return apiClient.get("/auth/me");
  },
};
