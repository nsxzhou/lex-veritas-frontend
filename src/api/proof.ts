/**
 * 区块链存证 API
 */

import { apiClient } from "./client";
import type { MerkleNode, ProofStat, RecentProof } from "@/types";

export interface MerkleTreeData {
  root: string;
  levels: MerkleNode[][];
}

export interface VerifyChunkRequest {
  chunkId: string;
}

export interface VerifyChunkResponse {
  verified: boolean;
  chunkHash: string;
  onChainRoot: string;
  computedRoot: string;
  blockNumber: number;
  txHash: string;
}

export const proofApi = {
  /**
   * 获取 Merkle Tree 结构
   */
  getMerkleTree: (): Promise<MerkleTreeData> => {
    return apiClient.get("/proof/merkle-tree");
  },

  /**
   * 获取最近存证记录
   */
  getRecentProofs: (limit?: number): Promise<RecentProof[]> => {
    return apiClient.get(`/proof/recent${limit ? `?limit=${limit}` : ""}`);
  },

  /**
   * 验证单个 Chunk 的链上完整性
   */
  verifyChunk: (data: VerifyChunkRequest): Promise<VerifyChunkResponse> => {
    return apiClient.post(`/proof/verify/${data.chunkId}`);
  },

  /**
   * 获取存证统计数据
   */
  getStats: (): Promise<ProofStat[]> => {
    return apiClient.get("/proof/stats");
  },
};
