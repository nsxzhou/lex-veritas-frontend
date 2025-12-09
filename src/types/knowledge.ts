/**
 * 知识库相关类型
 */

export type DocumentType = "pdf" | "docx" | "txt" | "url";
export type DocumentStatus = "indexed" | "processing" | "error" | "minted";

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: string;
  uploadDate: string;
  status: DocumentStatus;
  uploadedBy: string;
}
