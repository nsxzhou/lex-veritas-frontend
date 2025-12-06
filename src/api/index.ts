/**
 * API 服务统一导出
 */

export { apiClient } from "./client";
export { authApi } from "./auth";
export { chatApi } from "./chat";
export { knowledgeApi } from "./knowledge";
export { statsApi } from "./stats";
export { proofApi } from "./proof";
export { auditApi } from "./audit";
export { usersApi } from "./users";

export type {
  LoginRequest,
  PhoneLoginRequest,
  RegisterRequest,
  AuthResponse,
} from "./auth";
export type { ChatRequest, ChatResponse } from "./chat";
export type {
  UploadDocumentRequest,
  MintRequest,
  MintResponse,
} from "./knowledge";
export type { OverviewStats } from "./stats";
export type {
  MerkleTreeData,
  VerifyChunkRequest,
  VerifyChunkResponse,
} from "./proof";
export type { AuditLogsParams, AuditLogsResponse } from "./audit";
export type { UsersParams, UsersResponse, UpdateUserRequest } from "./users";
