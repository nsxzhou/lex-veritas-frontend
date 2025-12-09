/**
 * 管理员 API
 */

import { apiClient } from "./client";
import type { UserResponse, UserListResponse } from "@/types";

export interface GetUsersParams {
  page?: number;
  pageSize?: number;
  email?: string;
  role?: "user" | "admin" | "super_admin";
  status?: "active" | "inactive" | "banned";
  keyword?: string;
}

export const adminApi = {
  /**
   * 获取用户列表（支持分页和筛选）
   */
  getUsers: (params?: GetUsersParams): Promise<UserListResponse> => {
    const query = new URLSearchParams(
      Object.entries(params || {})
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ).toString();
    return apiClient.get(`/admin/users${query ? `?${query}` : ""}`);
  },

  /**
   * 获取用户详情
   */
  getUser: (userId: string): Promise<UserResponse> => {
    return apiClient.get(`/admin/users/${userId}`);
  },

  /**
   * 删除用户
   */
  deleteUser: (userId: string): Promise<void> => {
    return apiClient.delete(`/admin/users/${userId}`);
  },

  /**
   * 调整用户 Token 配额
   */
  adjustQuota: (userId: string, newQuota: number): Promise<void> => {
    return apiClient.put(`/admin/users/${userId}/quota`, {
      userId,
      newQuota,
    });
  },

  /**
   * 修改用户角色
   */
  updateRole: (
    userId: string,
    role: "user" | "admin" | "super_admin"
  ): Promise<void> => {
    return apiClient.put(`/admin/users/${userId}/role`, { role });
  },

  /**
   * 修改用户状态
   */
  updateStatus: (
    userId: string,
    status: "active" | "inactive" | "banned"
  ): Promise<void> => {
    return apiClient.put(`/admin/users/${userId}/status`, { status });
  },
};
