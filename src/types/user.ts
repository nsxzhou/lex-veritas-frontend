/**
 * 用户相关类型
 */

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: "user" | "admin" | "super_admin";
  status: "active" | "inactive" | "banned";
  tokenQuota: number;
  tokenUsed: number;
  createdAt: string;
  lastLoginAt?: string;
}

export interface UserListResponse {
  list: UserResponse[];
  page: number;
  pageSize: number;
  total: number;
}

export interface UsageStats {
  userId: string;
  tokenQuota: number;
  tokenUsed: number;
  remaining: number;
  usageRate: number;
}

export interface UserHistory {
  id: number;
  title: string;
  date: string;
  tokens: number;
  status: string;
}

export interface TokenUsage {
  name: string;
  tokens: number;
}
