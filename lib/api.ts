"use client"

import axios from "axios"

export const baseURL = process.env.EXPO_PUBLIC_API_URL

// Create a variable to store the token
let authToken: string | null = null

// Function to set the token from components
export const setAuthToken = (token: string | null) => {
  authToken = token
}

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 60000,
})

// Create interceptor for api
api.interceptors.request.use(
  (config) => {
    // Use the stored token instead of calling useAuth()
    if (authToken) {
      config.headers.Authorization = `${authToken}`
    }
    return config
  },
  (error) => {
    console.log("API Request Error:", error)
    return Promise.reject(error)
  },
)

// Create interceptor for api response
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      status: response.status,
      data: response.data,
    })
    return response
  },
  (error) => {
    console.log("API Response Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    })
    return Promise.reject(error)
  },
)

export default api

