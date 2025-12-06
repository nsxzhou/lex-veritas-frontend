/**
 * LexVeritas 统一类型定义
 */

// ============================================
// 用户相关类型
// ============================================

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  lastActive: string;
  avatarColor?: string;
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

// ============================================
// 聊天相关类型
// ============================================

export interface ChatSession {
  id: string;
  title: string;
  date: string;
  preview: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  citations?: Citation[];
}

export interface Citation {
  id: string;
  text: string;
  source: string;
  verificationId: string;
  blockNumber: number;
  timestamp: string;
  metadata: {
    law_name: string;
    part: string;
    chapter: string;
    section?: string;
    article_number: string;
  };
}

// ============================================
// 知识库相关类型
// ============================================

export type DocumentType = "pdf" | "docx" | "txt" | "url";
export type DocumentStatus = "indexed" | "processing" | "error" | "minted";

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: string;
  uploadDate: string;
  status: DocumentStatus;
  uploadedBy: string;
}

// ============================================
// Dashboard 统计相关类型
// ============================================

export interface Stat {
  title: string;
  value: string;
  delta: number;
  positive: boolean;
  icon: React.ElementType;
  chartData: { name: string; uv: number }[];
  color: string;
  bgColor: string;
  strokeColor: string;
}

export interface QueryVolume {
  name: string;
  value: number;
}

export interface RecentActivity {
  user: string;
  action: string;
  target: string;
  time: string;
  icon: React.ElementType;
}

// ============================================
// 区块链存证相关类型
// ============================================

export type MerkleNodeType = "root" | "node" | "leaf";
export type MerkleNodeStatus = "verified" | "tampered" | "pending";

export interface MerkleNode {
  hash: string;
  type: MerkleNodeType;
  status: MerkleNodeStatus;
  data?: string;
}

export interface ProofStat {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

export interface RecentProof {
  id: number;
  root: string;
  timestamp: string;
  block: number;
  status: string;
  txHash: string;
}

// ============================================
// 审计日志相关类型
// ============================================

export type AuditLogType = "tamper" | "access" | "verify" | "system";
export type AuditLogSeverity = "high" | "medium" | "low";
export type AuditLogStatus = "unresolved" | "investigating" | "resolved";

export interface AuditLog {
  id: number;
  type: AuditLogType;
  severity: AuditLogSeverity;
  message: string;
  source: string;
  timestamp: string;
  status: AuditLogStatus;
}
