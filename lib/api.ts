"use client"

import { useAuthStore } from "@/store/auth-store";
import { useSignupStore } from "@/store/signup-store";
import axios from "axios";

export const baseURL = process.env.EXPO_PUBLIC_API_URL

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 60000,
})

// Updated request interceptor to check both stores
api.interceptors.request.use(
  (config) => {
    // First check for signup JWT token
    const signupToken = useSignupStore.getState().jwtToken;
    const authToken = useAuthStore.getState().accessToken;

    // Use signup token if available, otherwise use auth token
    const token = signupToken || authToken;

    // Set Authorization header if a token exists
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error) => {
    console.log("API Request Error:", error);
    return Promise.reject(error);
  },
);

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

// --- Extracted Refresh Token Function --- 
const handleRefreshToken = async (): Promise<string> => {
  const currentRefreshToken = useAuthStore.getState().accessToken;

  if (!currentRefreshToken) {
    console.log('No refresh token available, logging out.');
    useAuthStore.getState().clearAuth();
    throw new Error('No refresh token available');
  }

  try {
    console.log('Attempting to refresh token...');
    const refreshResponse = await axios.post(
      `${baseURL}/eserve-one/refreshToken`,
      {
        headers: {
          'Authorization': `${currentRefreshToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data;

    if (!newAccessToken) {
      throw new Error('New access token not received from refresh endpoint');
    }

    console.log('Token refreshed successfully.');
    const currentUser = useAuthStore.getState().user;
    useAuthStore.getState().setAuth(newAccessToken, newRefreshToken || currentRefreshToken, currentUser!); // Update store
    return newAccessToken;
  } catch (refreshError: any) {
    // console.error('Failed to refresh token:', refreshError?.response?.data || refreshError.message);
    useAuthStore.getState().clearAuth(); // Clear auth state on refresh failure
    throw refreshError; // Re-throw error to be caught by the interceptor
  }
}

// Response interceptor (keep as is or modify as needed)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 errors
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // --- Queueing Logic --- 
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        // Apply the refreshed token to the queued request
        originalRequest.headers['Authorization'] = ` ${token}`;
        return api(originalRequest);
      });
    }

    // --- Attempt Refresh --- 
    originalRequest._retry = true; // Mark that we attempted a retry
    isRefreshing = true;

    try {
      const newAccessToken = await handleRefreshToken(); // Call the extracted function

      // Refresh successful: apply new token and process queue
      originalRequest.headers['Authorization'] = ` ${newAccessToken}`;
      processQueue(null, newAccessToken);

      // Retry the original request with the new token
      return api(originalRequest);
    } catch (refreshError) {
      // Refresh failed: reject queue and bubble up the error
      processQueue(refreshError, null);
      originalRequest._retry = true; // Mark as retry
      return Promise.reject(refreshError); // Important: reject the original request too
    } finally {
      isRefreshing = false; // Always reset the flag
    }
  },
);

export default api;

