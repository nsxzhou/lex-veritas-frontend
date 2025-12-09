/**
 * 后端 API 通用类型
 */

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface LoginResponse {
  token: TokenPair;
  user: UserResponse;
}

import type { UserResponse } from "./user";
