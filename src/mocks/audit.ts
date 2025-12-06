import type { AuditLog } from "@/types";

export type { AuditLog };

export const auditLogs: AuditLog[] = [
  {
    id: 1,
    type: "tamper",
    severity: "high",
    message: "检测到数据篡改尝试",
    source: "Doc D (0x3c4...5d6)",
    timestamp: "2024-03-20 15:45:22",
    status: "unresolved",
  },
  {
    id: 2,
    type: "access",
    severity: "low",
    message: "异常IP访问尝试",
    source: "192.168.1.105",
    timestamp: "2024-03-20 14:12:05",
    status: "resolved",
  },
  {
    id: 3,
    type: "verify",
    severity: "medium",
    message: "完整性校验失败",
    source: "Contract #8821",
    timestamp: "2024-03-19 09:30:00",
    status: "investigating",
  },
  {
    id: 4,
    type: "system",
    severity: "low",
    message: "节点同步延迟",
    source: "Polygon Node",
    timestamp: "2024-03-18 22:15:00",
    status: "resolved",
  },
  {
    id: 5,
    type: "tamper",
    severity: "high",
    message: "哈希不匹配警告",
    source: "Evidence #992",
    timestamp: "2024-03-18 10:05:33",
    status: "resolved",
  },
];
