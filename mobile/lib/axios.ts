import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import { useEffect } from "react";
const API_URL = "https://wassup-neon.vercel.app/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAPI = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use(async (config) => {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    //cleanup code
    return () => {
      api.interceptors.request.eject(reqInterceptor);
    };
  }, [getToken]);

  return api;
};
