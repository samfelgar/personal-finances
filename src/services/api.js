import axios from "axios";
import { clearStoredAccessToken, getStoredAccessToken } from "./auth";

export function apiBaseUri() {
  return import.meta.env.VITE_API_URL;
}

export const api = axios.create({
  baseURL: apiBaseUri(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getStoredAccessToken();

    if (accessToken === null) {
      return config;
    }

    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
)

api.interceptors.response.use(
  null,
  (error) => {
    const { status } = error.response;

    if (status === 401) {
      clearStoredAccessToken();
      window.location = '/login';
      return;
    }

    Promise.reject(error);
  }
)