import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { supabase } from './supabase';

const server2Url = import.meta.env.VITE_SERVER2_URL;

if (!server2Url) {
  throw new Error('VITE_SERVER2_URL is not defined in env.');
}

// Only connect to Server 2. Server 1 and Server 3 direct connection forbidden.
export const api = axios.create({
  baseURL: server2Url,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthenticated -> Sign out from Supabase (triggers authStore redirect via guard)
      await supabase.auth.signOut();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
