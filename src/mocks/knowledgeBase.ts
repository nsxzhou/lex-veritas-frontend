import type { Document } from "@/types";

export type { Document };

export const initialDocuments: Document[] = [
  {
    id: "1",
    name: "劳动合同法_2024修订版.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadDate: "2024-03-15",
    status: "indexed",
    uploadedBy: "Admin",
  },
  {
    id: "2",
    name: "公司章程模板_v3.docx",
    type: "docx",
    size: "856 KB",
    uploadDate: "2024-03-14",
    status: "indexed",
    uploadedBy: "Alice Guo",
  },
  {
    id: "3",
    name: "知识产权纠纷案例集.txt",
    type: "txt",
    size: "124 KB",
    uploadDate: "2024-03-12",
    status: "processing",
    uploadedBy: "Bob Chen",
  },
  {
    id: "4",
    name: "最高法关于民事诉讼证据的若干规定",
    type: "url",
    size: "-",
    uploadDate: "2024-03-10",
    status: "indexed",
    uploadedBy: "System",
  },
  {
    id: "5",
    name: "无效合同.pdf",
    type: "pdf",
    size: "0 KB",
    uploadDate: "2024-03-09",
    status: "error",
    uploadedBy: "David Li",
  },
];
