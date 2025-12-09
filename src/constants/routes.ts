/**
 * 路由常量定义
 */

export const ROUTES = {
  // 公开路由
  HOME: "/",
  LOGIN: "/login",
  SHOWCASE: "/showcase",

  // 用户路由
  PROFILE: "/profile",

  // 管理后台路由
  ADMIN: "/admin",
  ADMIN_DASHBOARD: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_KNOWLEDGE: "/admin/knowledge",
  ADMIN_PROOF: "/admin/proof",
  ADMIN_AUDIT: "/admin/audit",
  ADMIN_SETTINGS: "/admin/settings",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
