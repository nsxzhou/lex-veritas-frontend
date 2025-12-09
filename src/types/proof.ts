/**
 * 区块链存证相关类型
 */

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
