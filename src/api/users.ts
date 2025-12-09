/**
 * 用户个人信息 API
 */

import { apiClient } from "./client";
import type { UsageStats } from "@/types";

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  avatar?: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export const userApi = {
  /**
   * 更新个人资料
   */
  updateProfile: (data: UpdateProfileRequest): Promise<void> => {
    return apiClient.put("/users/me", data);
  },

  /**
   * 修改密码
   */
  changePassword: (data: ChangePasswordRequest): Promise<void> => {
    return apiClient.put("/users/me/password", data);
  },

  /**
   * 获取当前用户 Token 配额
   */
  getQuota: (): Promise<UsageStats> => {
    return apiClient.get("/users/me/quota");
  },
};
