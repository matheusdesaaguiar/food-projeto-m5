// src/hooks/useApi.ts

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { useState, useCallback, useMemo } from 'react';
import { toast } from 'sonner';

type ApiMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Criamos a instância do axios com useMemo para evitar recriações desnecessárias
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });

    // Configuração do interceptor para autenticação
    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const newConfig = { ...config };
      
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          newConfig.headers = new AxiosHeaders(newConfig.headers);
          newConfig.headers.set('Authorization', `Bearer ${token}`);
        }
      }
      return newConfig;
    });

    return instance;
  }, []); // Dependências vazias pois só deve ser criada uma vez

  const request = useCallback(
    async <T>(method: ApiMethod, url: string, data?: unknown): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const response: AxiosResponse<T> = await api[method]<T>(url, data);
        return response.data;
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';
        
        toast.error(errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [api] // Agora api está incluída nas dependências
  );

  return { request, loading, error };
};