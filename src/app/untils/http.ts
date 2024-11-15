/* eslint-disable @typescript-eslint/no-explicit-any */
import envConfig from "@/config";
import { LoginResType } from "../schemaValidations/auth.schema";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

class SessionToken {
  private token = "";
  get value() {
    return this.token;
  }
  set value(token: string) {
    // nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === "undefined") {
      throw new Error("Cannot token on server side");
    }
    this.token = token;
    //console.log('clientSessionToken set to:', this.token)  // In ra giá trị của token khi được set
  }
}

export const clientSessionToken = new SessionToken();
//console.log('clientSessionToken set to 2:', clientSessionToken.value)

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  const body =
    options?.body instanceof FormData
      ? options.body // Giữ nguyên body nếu là FormData
      : options?.body
      ? JSON.stringify(options.body)
      : undefined;

  // Tạo baseHeaders với header Authorization
  const baseHeaders: Record<string, string> = {
    Authorization: clientSessionToken.value
      ? `Bearer ${clientSessionToken.value}`
      : "",
  };

  // Lấy baseUrl
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  console.log("URLF:", fullUrl);
  console.log("BaseRLF:", baseUrl);

  // Kiểm tra nếu URL có chứa phần liên quan đến thêm, sửa hoặc xóa CV
  const isCvApiUrl =
    fullUrl.includes("/candidate/cvs") || fullUrl.includes("/candidate-cv");

  // Nếu không phải là API CV, thêm Content-Type
  if (!isCvApiUrl) {
    baseHeaders["Content-Type"] = "application/json";
  }

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers, // Thêm các headers khác nếu có
    },
    body,
    method,
  });

  // Xử lý response
  const payload: Response = await res.json();

  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    throw new HttpError(data);
  }

  if (typeof window !== "undefined") {
    if (["/user/login", "/user/register"].includes(url)) {
      clientSessionToken.value = (payload as LoginResType).data.token;
    }
  }

  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default http;
