// 用户数据类型定义
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  lastActive: string;
  avatarColor: string;
}

// 用户历史记录类型定义
export interface UserHistory {
  id: number;
  title: string;
  date: string;
  tokens: number;
  status: string;
}

// Token使用数据类型定义
export interface TokenUsage {
  name: string;
  tokens: number;
}

// Mock用户列表数据
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@lexveritas.com",
    role: "admin",
    status: "active",
    lastActive: "Just now",
    avatarColor: "bg-blue-500",
  },
  {
    id: "2",
    name: "Alice Guo",
    email: "alice@lexveritas.com",
    role: "user",
    status: "active",
    lastActive: "10 mins ago",
    avatarColor: "bg-emerald-500",
  },
  {
    id: "3",
    name: "Bob Chen",
    email: "bob@lexveritas.com",
    role: "admin",
    status: "active",
    lastActive: "2 hours ago",
    avatarColor: "bg-amber-500",
  },
  {
    id: "4",
    name: "David Li",
    email: "david@lexveritas.com",
    role: "user",
    status: "inactive",
    lastActive: "3 days ago",
    avatarColor: "bg-purple-500",
  },
];

// Mock用户历史记录数据
export const mockUserHistory: UserHistory[] = [
  {
    id: 1,
    title: "劳动合同纠纷咨询",
    date: "2024-03-20 14:30",
    tokens: 450,
    status: "verified",
  },
  {
    id: 2,
    title: "知识产权侵权判定",
    date: "2024-03-19 09:15",
    tokens: 1200,
    status: "verified",
  },
  {
    id: 3,
    title: "公司注册流程",
    date: "2024-03-18 16:45",
    tokens: 320,
    status: "verified",
  },
  {
    id: 4,
    title: "房屋租赁合同审查",
    date: "2024-03-15 11:20",
    tokens: 890,
    status: "verified",
  },
];

// Mock Token使用趋势数据
export const mockTokenUsage: TokenUsage[] = [
  { name: "Mon", tokens: 2400 },
  { name: "Tue", tokens: 1398 },
  { name: "Wed", tokens: 9800 },
  { name: "Thu", tokens: 3908 },
  { name: "Fri", tokens: 4800 },
  { name: "Sat", tokens: 3800 },
  { name: "Sun", tokens: 4300 },
];
