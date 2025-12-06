import { Box, ShieldCheck, FileText } from "lucide-react";
import type { MerkleNode, ProofStat, RecentProof } from "@/types";

export type { MerkleNode, ProofStat, RecentProof };

export const merkleTreeData = {
  root: "0x8f3...2a9",
  levels: [
    [
      {
        hash: "0x8f3...2a9",
        type: "root" as const,
        status: "verified" as const,
      },
    ],
    [
      {
        hash: "0x4a1...b2c",
        type: "node" as const,
        status: "verified" as const,
      },
      {
        hash: "0x9d2...e4f",
        type: "node" as const,
        status: "verified" as const,
      },
    ],
    [
      {
        hash: "0x1b2...3c4",
        type: "leaf" as const,
        status: "verified" as const,
        data: "Doc A",
      },
      {
        hash: "0x5e6...7f8",
        type: "leaf" as const,
        status: "verified" as const,
        data: "Doc B",
      },
      {
        hash: "0x9a0...1b2",
        type: "leaf" as const,
        status: "verified" as const,
        data: "Doc C",
      },
      {
        hash: "0x3c4...5d6",
        type: "leaf" as const,
        status: "tampered" as const,
        data: "Doc D",
      },
    ],
  ],
};

export const recentProofs: RecentProof[] = [
  {
    id: 1,
    root: "0x8f3...2a9",
    timestamp: "2024-03-20 14:30:00",
    block: 18234567,
    status: "verified",
    txHash: "0x7f...3a2b",
  },
  {
    id: 2,
    root: "0x7e2...1b8",
    timestamp: "2024-03-20 14:00:00",
    block: 18234500,
    status: "verified",
    txHash: "0x2c...9d1e",
  },
  {
    id: 3,
    root: "0x6d1...0a7",
    timestamp: "2024-03-20 13:30:00",
    block: 18234450,
    status: "pending",
    txHash: "0x5a...8b4c",
  },
];

export const proofStats: ProofStat[] = [
  {
    label: "已存证区块",
    value: "1,234",
    icon: Box,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "验证通过",
    value: "99.9%",
    icon: ShieldCheck,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "今日新增",
    value: "+56",
    icon: FileText,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];
