/**
 * API 客户端配置
 */

import type { ApiResponse } from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

/**
 * 通用 API 请求封装
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };

    // 从 localStorage 获取 token
    const token = localStorage.getItem("accessToken");
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    // 解析响应
    const apiResponse: ApiResponse<T> = await response.json().catch(() => ({
      code: response.status,
      message: "请求失败",
      data: null as T,
    }));

    // 检查 HTTP 状态码
    if (!response.ok) {
      throw new Error(apiResponse.message || `HTTP Error: ${response.status}`);
    }

    // 检查业务状态码
    if (apiResponse.code !== 200 && apiResponse.code !== 0) {
      throw new Error(apiResponse.message || "请求失败");
    }

    // 返回解包后的 data
    return apiResponse.data;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  /**
   * 流式请求（用于 SSE）
   */
  async stream(
    endpoint: string,
    data: unknown,
    onMessage: (chunk: string) => void,
    onDone?: () => void
  ): Promise<void> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = localStorage.getItem("auth_token");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("无法读取响应流");
    }

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      onMessage(chunk);
    }

    onDone?.();
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
