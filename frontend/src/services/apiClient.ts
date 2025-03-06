import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getSession, signOut } from "next-auth/react";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();
    const token = session?.user?.accessToken;
    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }

      // Set the Authorization header
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
        console.log("Session:", session);
        const refreshToken = session?.user?.refreshToken;
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/refresh-token`,
          { refresh_token: refreshToken }
        );
        const { access_token, refresh_token } = refreshResponse.data.data;

        // Store new tokens
        console.log("New token:", access_token);

        session.user.accessToken = access_token;
        session.user.refreshToken = refresh_token;

        // Retry the original request with the new token
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

export default apiClient;
