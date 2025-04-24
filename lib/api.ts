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

// Response interceptor (keep as is or modify as needed)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

