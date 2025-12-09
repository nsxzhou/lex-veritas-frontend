/**
 * LexVeritas 统一类型定义
 * 所有类型按模块组织，从各自文件导出
 */

// API 通用类型
export type { ApiResponse, TokenPair, LoginResponse } from "./api";

// 用户相关类型
export type {
  UserResponse,
  UserListResponse,
  UsageStats,
  UserHistory,
  TokenUsage,
} from "./user";

// 聊天相关类型
export type { ChatSession, Message, Citation } from "./chat";

// 知识库相关类型
export type { DocumentType, DocumentStatus, Document } from "./knowledge";

// Dashboard 统计相关类型
export type { Stat, QueryVolume, RecentActivity } from "./dashboard";

// 区块链存证相关类型
export type {
  MerkleNodeType,
  MerkleNodeStatus,
  MerkleNode,
  ProofStat,
  RecentProof,
} from "./proof";

// 审计日志相关类型
export type {
  AuditLogType,
  AuditLogSeverity,
  AuditLogStatus,
  AuditLog,
} from "./audit";
