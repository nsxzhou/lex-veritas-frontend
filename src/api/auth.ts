/**
 * 用户认证 API
 */

import { apiClient } from "./client";
import type { UserResponse, LoginResponse, TokenPair } from "@/types";

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
  code: string;
  phone?: string;
}

export interface SendCodeRequest {
  email: string;
  purpose: "register" | "reset_password";
}

export interface RefreshRequest {
  refreshToken: string;
}

export const authApi = {
  /**
   * 邮箱密码登录
   */
  login: (data: LoginRequest): Promise<LoginResponse> => {
    return apiClient.post("/auth/login", data);
  },

  /**
   * 手机验证码登录
   */
  loginByPhone: (data: PhoneLoginRequest): Promise<LoginResponse> => {
    return apiClient.post("/auth/login/phone", data);
  },

  /**
   * 发送验证码
   */
  sendVerifyCode: (data: SendCodeRequest): Promise<void> => {
    return apiClient.post("/auth/send-code", data);
  },

  /**
   * 用户注册
   */
  register: (data: RegisterRequest): Promise<UserResponse> => {
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
  getCurrentUser: (): Promise<UserResponse> => {
    return apiClient.get("/auth/me");
  },

  /**
   * 刷新令牌
   */
  refresh: (data: RefreshRequest): Promise<TokenPair> => {
    return apiClient.post("/auth/refresh", data);
  },
};
