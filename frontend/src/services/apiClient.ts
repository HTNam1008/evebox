import axios, { AxiosError, AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }

      // Set the Authorization header
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh-token');
        if (!refreshToken) throw new Error('No refresh token available');

        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/refresh-token`,
          { refresh_token: refreshToken }
        );
        const { access_token, refresh_token} = refreshResponse.data.data;

        // Store new tokens
        console.log("New token:",access_token)

        localStorage.setItem('token', access_token);
        localStorage.setItem('refresh-token', refresh_token);

        // Retry the original request with the new token
        if (!originalRequest.headers) {
          originalRequest.headers = new AxiosHeaders();
        }
        originalRequest.headers.set('Authorization', `Bearer ${access_token}`);
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh-token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
