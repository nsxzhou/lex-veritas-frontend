/**
 * Dashboard 统计 API
 */

import { apiClient } from "./client";
import type { Stat, QueryVolume, RecentActivity } from "@/types";

export interface OverviewStats {
  totalQueries: number;
  activeUsers: number;
  knowledgeItems: number;
  systemHealth: number;
  stats: Stat[];
}

export const statsApi = {
  /**
   * 获取总览统计数据
   */
  getOverview: (): Promise<OverviewStats> => {
    return apiClient.get("/stats/overview");
  },

  /**
   * 获取提问量趋势（24h）
   */
  getQueryVolume: (period?: "24h" | "7d" | "30d"): Promise<QueryVolume[]> => {
    return apiClient.get(
      `/stats/query-volume${period ? `?period=${period}` : ""}`
    );
  },

  /**
   * 获取最近活动
   */
  getRecentActivity: (limit?: number): Promise<RecentActivity[]> => {
    return apiClient.get(
      `/stats/recent-activity${limit ? `?limit=${limit}` : ""}`
    );
  },
};
