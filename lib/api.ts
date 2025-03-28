"use client"

import axios from "axios"
import * as SecureStore from 'expo-secure-store'

export const baseURL = process.env.EXPO_PUBLIC_API_URL

// Create a variable to store the token
let authToken: string | null = null

// Function to get token from secure store
export const getAuthToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('jwt_token')
    return token
  } catch (error) {
    console.error('Error getting token from secure store:', error)
    return null
  }
}

// Function to set the token in secure store and memory
export const setAuthToken = async (token: string | null) => {
  try {
    if (token) {
      await SecureStore.setItemAsync('jwt_token', token)
    } else {
      await SecureStore.deleteItemAsync('jwt_token')
    }
    authToken = token
  } catch (error) {
    console.error('Error setting token in secure store:', error)
  }
}

// Initialize token from secure store
getAuthToken().then(token => {
  authToken = token
})

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
  async (config) => {
    // Get the token from secure store if not in memory
    if (!authToken) {
      authToken = await getAuthToken()
    }

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
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api

