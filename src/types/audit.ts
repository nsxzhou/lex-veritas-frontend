/**
 * 审计日志相关类型
 */

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
