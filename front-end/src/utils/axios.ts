import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "./const";
import type { DataSession } from "../types/auth.type";

const BASE_URL_API = import.meta.env.BASE_URL_API || "http://localhost:3001/api";

const apiInstance = axios.create({
  baseURL: BASE_URL_API,
  timeout: 3000,
});

export const apiInstanceAuth = axios.create({
  baseURL: BASE_URL_API,
  timeout: 3000,
});

apiInstanceAuth.interceptors.request.use((config) => {
  const session = secureLocalStorage.getItem(STORAGE_KEY) as DataSession;
  console.log({ config });
  if (!session) {
    return config;
  }

  config.headers.Authorization = `Bearer ${session.token}`;
  return config;
});

export default apiInstance;
