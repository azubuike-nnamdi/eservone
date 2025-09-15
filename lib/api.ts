

import { useAuthStore } from "@/store/auth-store";
import { useSignupStore } from "@/store/signup-store";
import axios from "axios";

export const baseURL = process.env.EXPO_PUBLIC_API_URL || "https://api.eservone.com";
export const chatBaseURL = "https://chat.eservone.com"; // or from env

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 60000,
});

const chatApi = axios.create({
  baseURL: chatBaseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 60000,
});

// --- Interceptors (shared logic) ---
// Request interceptor
const requestInterceptor = (config: any) => {
  const signupToken = useSignupStore.getState().jwtToken;
  const authToken = useAuthStore.getState().accessToken;
  //const refreshToken = useAuthStore.getState().refreshToken;

  const token = signupToken || authToken;
  // console.log('token', token);
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
};
const requestErrorInterceptor = (error: any) => {
  console.log("API Request Error:", error);
  return Promise.reject(error);
};

api.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
chatApi.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

// --- Refresh Token Logic --- 
let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const handleRefreshToken = async (): Promise<string> => {
  const currentRefreshToken = useAuthStore.getState().refreshToken;
  if (!currentRefreshToken) {
    console.log('No refresh token available, logging out.');
    useAuthStore.getState().clearAuth();
    throw new Error('No refresh token available');
  }
  try {
    console.log('Attempting to refresh token...');
    const refreshResponse = await axios.post(
      `${baseURL}/eserve-one/refreshToken`,
      {},
      {
        headers: {
          'accessKey': `${currentRefreshToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // console.log('refreshResponse', refreshResponse)

    const { jwtToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data.data;
    if (!newAccessToken) {
      throw new Error('New access token not received from refresh endpoint');
    }

    console.log('Token refreshed successfully.');
    const currentUser = useAuthStore.getState().user;
    useAuthStore.getState().setAuth(newAccessToken, newRefreshToken || currentRefreshToken, currentUser!);
    return newAccessToken;
  } catch (refreshError: any) {
    useAuthStore.getState().clearAuth();
    throw refreshError;
  }
};

const responseInterceptor = (response: any) => response;
const responseErrorInterceptor = async (error: any) => {
  const originalRequest = error.config;
  if (error.response?.status !== 401 || originalRequest._retry) {
    return Promise.reject(error);
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then(token => {
      originalRequest.headers['Authorization'] = `${token}`;
      return api(originalRequest);
    });
  }

  originalRequest._retry = true;
  isRefreshing = true;

  try {
    const newAccessToken = await handleRefreshToken();
    originalRequest.headers['Authorization'] = `${newAccessToken}`;
    processQueue(null, newAccessToken);
    return api(originalRequest);
  } catch (refreshError) {
    processQueue(refreshError, null);
    return Promise.reject(refreshError);
  } finally {
    isRefreshing = false;
  }
};

api.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
chatApi.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export { api, chatApi };

