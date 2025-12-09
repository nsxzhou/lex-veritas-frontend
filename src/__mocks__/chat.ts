/**
 * 聊天相关 Mock 数据
 */

import type { Citation } from "@/components/EvidencePanel";

export interface ChatSession {
  id: string;
  title: string;
  date: string;
  preview: string;
}

export const MOCK_CITATION: Citation = {
  id: "cit-1",
  text: "第一百二十三条 民事主体依法享有物权。物权是权利人依法对特定的物享有直接支配和排他的权利，包括所有权、用益物权和担保物权。",
  source: "中华人民共和国民法典",
  verificationId: "0x7f...3a2b",
  blockNumber: 18234567,
  timestamp: "2023-10-27T10:00:00Z",
  metadata: {
    law_name: "中华人民共和国民法典",
    part: "第一编 总则",
    chapter: "第五章 民事权利",
    section: "第一节 物权",
    article_number: "第123条",
  },
};

export const MOCK_SESSIONS: ChatSession[] = [
  {
    id: "1",
    title: "民法典物权编",
    date: "今天",
    preview: "关于物权的定义...",
  },
  { id: "2", title: "合同纠纷咨询", date: "昨天", preview: "违约金的计算..." },
  {
    id: "3",
    title: "知识产权保护",
    date: "过去7天",
    preview: "商标注册流程...",
  },
];
