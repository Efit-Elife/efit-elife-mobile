import axios from "axios";

// Development base URLs for the API
// Android: http://10.0.2.2:3000/api
// iOS: http://localhost:3000/api

export const customAxios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
});
