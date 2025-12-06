/**
 * 知识库管理 API
 */

import { apiClient } from "./client";
import type { Document } from "@/types";

export interface UploadDocumentRequest {
  file?: File;
  url?: string;
  type: "pdf" | "docx" | "txt" | "url";
}

export interface MintRequest {
  documentIds: string[];
}

export interface MintResponse {
  merkleRoot: string;
  txHash: string;
  blockNumber: number;
  versionId: number;
}

export const knowledgeApi = {
  /**
   * 获取文档列表
   */
  getDocuments: (params?: {
    type?: string;
    status?: string;
    search?: string;
  }): Promise<Document[]> => {
    const query = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    return apiClient.get(`/knowledge/documents${query ? `?${query}` : ""}`);
  },

  /**
   * 上传文档
   */
  uploadDocument: async (data: UploadDocumentRequest): Promise<Document> => {
    if (data.file) {
      // 文件上传使用 FormData
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("type", data.type);

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api"
        }/knowledge/documents`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("上传失败");
      }

      return response.json();
    }

    // URL 类型直接 POST JSON
    return apiClient.post("/knowledge/documents", {
      url: data.url,
      type: data.type,
    });
  },

  /**
   * 删除文档
   */
  deleteDocument: (documentId: string): Promise<void> => {
    return apiClient.delete(`/knowledge/documents/${documentId}`);
  },

  /**
   * 获取文档详情
   */
  getDocument: (documentId: string): Promise<Document> => {
    return apiClient.get(`/knowledge/documents/${documentId}`);
  },

  /**
   * 批量上链（计算 Merkle Root 并发布）
   */
  mintDocuments: (data: MintRequest): Promise<MintResponse> => {
    return apiClient.post("/knowledge/documents/mint", data);
  },

  /**
   * 重新索引文档
   */
  reindexDocument: (documentId: string): Promise<Document> => {
    return apiClient.post(`/knowledge/documents/${documentId}/reindex`);
  },
};
