/**
 * Dashboard 统计相关类型
 */

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
