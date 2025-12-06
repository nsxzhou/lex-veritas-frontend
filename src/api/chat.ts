/**
 * 智能问答 API
 */

import { apiClient } from "./client";
import type { ChatSession, Message, Citation } from "@/types";

export interface ChatRequest {
  question: string;
  sessionId?: string;
}

export interface ChatResponse {
  answer: string;
  citations: Citation[];
}

export const chatApi = {
  /**
   * 发送问题（流式响应）
   */
  sendMessage: (
    data: ChatRequest,
    onMessage: (chunk: string) => void,
    onDone?: () => void
  ): Promise<void> => {
    return apiClient.stream("/chat", data, onMessage, onDone);
  },

  /**
   * 获取会话列表
   */
  getSessions: (): Promise<ChatSession[]> => {
    return apiClient.get("/chat/sessions");
  },

  /**
   * 获取会话详情
   */
  getSession: (
    sessionId: string
  ): Promise<{ session: ChatSession; messages: Message[] }> => {
    return apiClient.get(`/chat/sessions/${sessionId}`);
  },

  /**
   * 创建新会话
   */
  createSession: (title?: string): Promise<ChatSession> => {
    return apiClient.post("/chat/sessions", { title });
  },

  /**
   * 删除会话
   */
  deleteSession: (sessionId: string): Promise<void> => {
    return apiClient.delete(`/chat/sessions/${sessionId}`);
  },

  /**
   * 重命名会话
   */
  renameSession: (sessionId: string, title: string): Promise<ChatSession> => {
    return apiClient.put(`/chat/sessions/${sessionId}`, { title });
  },
};
