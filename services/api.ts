import { ENV } from '@/constants/env';
import axios from 'axios';

const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  // Add token here when needed
  // const token = await getToken();
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error.response?.data || error;
  }
);

type ApiFetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: Record<string, any>;
  body?: any;
};

export async function apiFetch<T>(
  path: string,
  options?: ApiFetchOptions | Record<string, any>
): Promise<T> {
  const isLegacy = options && !('method' in options) && !('body' in options);
  
  const { data } = await api.request({
    url: path,
    method: isLegacy ? 'GET' : options?.method ?? 'GET',
    params: isLegacy ? options : options?.params,
    data: !isLegacy ? options?.body : undefined,
  });

  return data;
}

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
};