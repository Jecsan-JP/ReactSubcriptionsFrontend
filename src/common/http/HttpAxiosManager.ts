import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import {
  BaseResponseDto,
  DeleteRequestConfig,
  GetRequestConfig,
  HttpError,
  HttpInterceptor,
  HttpManager,
  PostRequestConfig,
  PutRequestConfig,
} from "./HttpManager";
import { debugPrint } from "../domain/constants/debugPrint";
import { authDatapool } from "@/features/app/domain/datapool/AuthDatapool";

class HttpAxiosManager implements HttpManager {
  private axiosInstance: AxiosInstance;
  private token: string | undefined;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  setToken(token: string | undefined): void {
    this.token = token;
  }

  get<T>({
    endpoint,
    queryParams = {},
    headers = {},
  }: GetRequestConfig): Promise<T> {
    return this.resolve<T>(
      this.axiosInstance.get<T>(endpoint, {
        params: queryParams,
        headers: {
          ...headers,
          ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        },
      })
    );
  }

  post<T>({
    endpoint,
    body = {},
    headers = {},
  }: PostRequestConfig): Promise<T> {
    debugPrint("HTTP: ", endpoint);
    return this.resolve<T>(
      this.axiosInstance.post(endpoint, body, {
        headers: {
          ...headers,
          ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        },
      })
    );
  }

  put<T>({
    endpoint,
    body = {},
    headers = {},
    queryParams,
  }: PutRequestConfig): Promise<T> {
    return this.resolve<T>(
      this.axiosInstance.put<T>(endpoint, body, {
        params: queryParams,
        headers: {
          ...headers,
          ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        },
      })
    );
  }

  delete<T>({
    endpoint,
    queryParams = {},
    headers = {},
  }: DeleteRequestConfig): Promise<T> {
    return this.resolve<T>(
      this.axiosInstance.delete<T>(endpoint, {
        params: queryParams,
        headers: {
          ...headers,
          ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        },
      })
    );
  }

  addInterceptor(interceptor: HttpInterceptor): void {
    if (interceptor.request) {
      this.axiosInstance.interceptors.request.use(interceptor.request);
    }
    if (interceptor.response) {
      this.axiosInstance.interceptors.response.use(interceptor.response);
    }
  }

  private resolve<T>(request: Promise<AxiosResponse<any, any>>) {
    return request
      .then((response) => {
        const baseResponse = response.data as BaseResponseDto<T>;
        return baseResponse.data as T;
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            this.setToken(undefined);
            authDatapool.setValue(false);
          }
          const statusCode = error.response?.data?.headers?.code ?? 500;
          const message =
            error.response?.data?.headers?.message ?? error.message;
          const errorCode = error.response?.data?.headers?.errorCode ?? -80;

          throw new HttpError(statusCode, message, errorCode);
        } else {
          throw error;
        }
      });
  }
}

export default HttpAxiosManager;
