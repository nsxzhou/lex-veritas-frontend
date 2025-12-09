/**
 * 聊天相关类型
 */

export interface ChatSession {
  id: string;
  title: string;
  date: string;
  preview: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  citations?: Citation[];
}

export interface Citation {
  id: string;
  text: string;
  source: string;
  verificationId: string;
  blockNumber: number;
  timestamp: string;
  metadata: {
    law_name: string;
    part: string;
    chapter: string;
    section?: string;
    article_number: string;
  };
}
