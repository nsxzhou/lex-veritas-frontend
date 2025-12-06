/**
 * 用户管理 API
 */

import { apiClient } from "./client";
import type { User, UserHistory, TokenUsage } from "@/types";

export interface UsersParams {
  page?: number;
  limit?: number;
  role?: "admin" | "user";
  status?: "active" | "inactive";
  search?: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: "admin" | "user";
  status?: "active" | "inactive";
}

export const usersApi = {
  /**
   * 获取用户列表
   */
  getUsers: (params?: UsersParams): Promise<UsersResponse> => {
    const query = new URLSearchParams(
      Object.entries(params || {})
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ).toString();
    return apiClient.get(`/users${query ? `?${query}` : ""}`);
  },

  /**
   * 获取单个用户详情
   */
  getUser: (userId: string): Promise<User> => {
    return apiClient.get(`/users/${userId}`);
  },

  /**
   * 更新用户信息
   */
  updateUser: (userId: string, data: UpdateUserRequest): Promise<User> => {
    return apiClient.put(`/users/${userId}`, data);
  },

  /**
   * 删除用户
   */
  deleteUser: (userId: string): Promise<void> => {
    return apiClient.delete(`/users/${userId}`);
  },

  /**
   * 获取用户咨询历史
   */
  getUserHistory: (userId: string): Promise<UserHistory[]> => {
    return apiClient.get(`/users/${userId}/history`);
  },

  /**
   * 获取用户 Token 使用趋势
   */
  getTokenUsage: (
    userId: string,
    period?: "7d" | "30d" | "90d"
  ): Promise<TokenUsage[]> => {
    return apiClient.get(
      `/users/${userId}/token-usage${period ? `?period=${period}` : ""}`
    );
  },
};
