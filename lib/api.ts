//create axios instance
import axios from "axios";


export const baseURL = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",

  },
  timeout: 60000,
});


//create interceptor for api
api.interceptors.request.use(
  (config) => {
    console.log("API Request:", {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    })
    return config
  },
  (error) => {
    console.log("API Request Error:", error)
    return Promise.reject(error)
  },
)

//create interceptor for api response
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

export default api;
