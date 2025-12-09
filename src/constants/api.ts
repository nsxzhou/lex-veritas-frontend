/**
 * API 相关常量
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

export const API_ENDPOINTS = {
  // 认证
  AUTH_LOGIN: "/auth/login",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_REFRESH: "/auth/refresh",
  AUTH_REGISTER: "/auth/register",
  AUTH_VERIFY_CODE: "/auth/verify-code",
  AUTH_ME: "/auth/me",

  // 用户
  USERS: "/users",
  USER_USAGE: "/users/usage",

  // 知识库
  KNOWLEDGE: "/knowledge",

  // 聊天
  CHAT: "/chat",
  CHAT_STREAM: "/chat/stream",

  // 管理
  ADMIN_USERS: "/admin/users",
  ADMIN_STATS: "/admin/stats",
} as const;
