/**
 * 审计日志 API
 */

import { apiClient } from "./client";
import type {
  AuditLog,
  AuditLogType,
  AuditLogSeverity,
  AuditLogStatus,
} from "@/types";

export interface AuditLogsParams {
  page?: number;
  limit?: number;
  type?: AuditLogType;
  severity?: AuditLogSeverity;
  status?: AuditLogStatus;
  startDate?: string;
  endDate?: string;
}

export interface AuditLogsResponse {
  logs: AuditLog[];
  total: number;
  page: number;
  limit: number;
}

export const auditApi = {
  /**
   * 获取审计日志列表
   */
  getLogs: (params?: AuditLogsParams): Promise<AuditLogsResponse> => {
    const query = new URLSearchParams(
      Object.entries(params || {})
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ).toString();
    return apiClient.get(`/audit/logs${query ? `?${query}` : ""}`);
  },

  /**
   * 获取单条审计日志详情
   */
  getLog: (logId: number): Promise<AuditLog> => {
    return apiClient.get(`/audit/logs/${logId}`);
  },

  /**
   * 标记日志为已处理
   */
  resolveLog: (logId: number, resolution?: string): Promise<AuditLog> => {
    return apiClient.post(`/audit/logs/${logId}/resolve`, { resolution });
  },

  /**
   * 标记日志为调查中
   */
  investigateLog: (logId: number): Promise<AuditLog> => {
    return apiClient.post(`/audit/logs/${logId}/investigate`);
  },
};
