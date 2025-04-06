import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";
import axiosRetry from "axios-retry";

const createApiClient = (baseUrl: string): AxiosInstance => {
  const apiClient = axios.create({ baseURL: baseUrl });

  axiosRetry(apiClient, {
    retries: 2,
    retryDelay: (retryCount) => {
      console.log(`Retry attempt #${retryCount}`);
      return retryCount * 1000; // Exponential backoff
    },
    retryCondition: (error) => {
      return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === "ECONNABORTED"
    }
  });

  apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const session = await getSession();
      const token = session?.user?.accessToken;
      if (token) {
        if (!config.headers) {
          config.headers = new AxiosHeaders();
        }
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response, 
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const session = await getSession();
          const refreshToken = session?.user?.refreshToken;
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const refreshResponse = await axios.post(
            `${baseUrl}/api/user/refresh-token`,
            { refresh_token: refreshToken }
          );

          const { access_token, refresh_token } = refreshResponse.data.data;
          console.log("New token:", access_token);

          session.user.accessToken = access_token;
          session.user.refreshToken = refresh_token;
          
          if (!originalRequest.headers) {
            originalRequest.headers = new AxiosHeaders();
          }

          originalRequest.headers.set("Authorization", `Bearer ${access_token}`);

          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token failed", refreshError);

          await signOut({
            redirect: true,
            callbackUrl: "/login",
          });

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
}

export default createApiClient;