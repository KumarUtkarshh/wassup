import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";

const API_URL = "https://wassup-v5ka.onrender.com/api";

export const useAPI = () => {
  const { getToken } = useAuth();

  const api = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};
