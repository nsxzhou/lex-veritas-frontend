import {
  Users,
  Search,
  Server,
  Database,
  FileText,
  Activity,
} from "lucide-react";

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

export const stats: Stat[] = [
  {
    title: "总提问数",
    value: "128,930",
    delta: 12.5,
    positive: true,
    icon: Search,
    chartData: [
      { name: "Mon", uv: 4000 },
      { name: "Tue", uv: 3000 },
      { name: "Wed", uv: 2000 },
      { name: "Thu", uv: 2780 },
      { name: "Fri", uv: 1890 },
      { name: "Sat", uv: 2390 },
      { name: "Sun", uv: 3490 },
    ],
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    strokeColor: "#2563eb",
  },
  {
    title: "活跃用户 (MAU)",
    value: "8,200",
    delta: 5.2,
    positive: true,
    icon: Users,
    chartData: [
      { name: "Mon", uv: 2000 },
      { name: "Tue", uv: 1500 },
      { name: "Wed", uv: 3000 },
      { name: "Thu", uv: 2500 },
      { name: "Fri", uv: 3200 },
      { name: "Sat", uv: 3800 },
      { name: "Sun", uv: 4200 },
    ],
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    strokeColor: "#4f46e5",
  },
  {
    title: "知识库条目",
    value: "1.2M",
    delta: 0.8,
    positive: true,
    icon: Database,
    chartData: [
      { name: "Mon", uv: 1000 },
      { name: "Tue", uv: 1200 },
      { name: "Wed", uv: 1100 },
      { name: "Thu", uv: 1300 },
      { name: "Fri", uv: 1400 },
      { name: "Sat", uv: 1350 },
      { name: "Sun", uv: 1500 },
    ],
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    strokeColor: "#059669",
  },
  {
    title: "系统健康度",
    value: "99.9%",
    delta: -0.01,
    positive: false,
    icon: Server,
    chartData: [
      { name: "Mon", uv: 99 },
      { name: "Tue", uv: 99 },
      { name: "Wed", uv: 98 },
      { name: "Thu", uv: 99 },
      { name: "Fri", uv: 100 },
      { name: "Sat", uv: 100 },
      { name: "Sun", uv: 99 },
    ],
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    strokeColor: "#d97706",
  },
];

export const queryVolumeData: QueryVolume[] = [
  { name: "00:00", value: 120 },
  { name: "04:00", value: 50 },
  { name: "08:00", value: 800 },
  { name: "12:00", value: 1500 },
  { name: "16:00", value: 1200 },
  { name: "20:00", value: 900 },
  { name: "23:59", value: 300 },
];

export const recentActivity: RecentActivity[] = [
  {
    user: "Alice Guo",
    action: "上传了新合同模板",
    target: "劳动合同_v2.pdf",
    time: "10分钟前",
    icon: FileText,
  },
  {
    user: "Bob Chen",
    action: "更新了知识库",
    target: "民法典_修正案.docx",
    time: "32分钟前",
    icon: Database,
  },
  {
    user: "System",
    action: "自动索引完成",
    target: "2,300 条新记录",
    time: "1小时前",
    icon: Server,
  },
  {
    user: "David Li",
    action: "标记了异常回答",
    target: "ID: #8823",
    time: "2小时前",
    icon: Activity,
  },
  {
    user: "Eva Zhang",
    action: "新增用户组",
    target: "法务部_实习生",
    time: "3小时前",
    icon: Users,
  },
];
