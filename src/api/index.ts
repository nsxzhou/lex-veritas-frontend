/**
 * API 服务统一导出
 */

export { authApi } from "./auth";
export { userApi } from "./users";
export { adminApi } from "./admin";
export { chatApi } from "./chat";
export { knowledgeApi } from "./knowledge";
export { statsApi } from "./stats";
export { proofApi } from "./proof";
export { auditApi } from "./audit";
export { apiClient } from "./client";

export type {
  LoginRequest,
  PhoneLoginRequest,
  RegisterRequest,
  SendCodeRequest,
  RefreshRequest,
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
export type { UpdateProfileRequest, ChangePasswordRequest } from "./users";

export type { GetUsersParams } from "./admin";
