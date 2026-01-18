import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { createSession, deleteSession } from '@/lib/session';
import { LoginData } from './types';

type LoginResponse = {
  data: {
    token: string  // Backend returns 'access_token', not 'token'
  }
};

type UseLoginOptions = {
  onSuccess?: () => void; // Changed: no user param since backend only returns token
};

export const useLogin = ({
  onSuccess,
}: UseLoginOptions = {}) => {
  const queryClient = useQueryClient();
  const { mutate: submit, isPending } = useMutation({
    mutationFn: async (data: LoginData) => await apiClient.post('/auth/login', data),
    onSuccess: async (response: LoginResponse) => {
      const { data } = response;
      if (data.token) {
        await createSession(data.token);
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
        onSuccess?.();
      }

    },
  });

  return { submit, isPending };
};

export const useLogout = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const { mutate: submit, isPending } = useMutation({
    mutationFn: async () => await apiClient.post('/auth/logout'),
    onSuccess: async () => {
      await deleteSession();
      queryClient.clear();
      onSuccess?.();
    },
    onError: async () => {
      await deleteSession();
      queryClient.clear();
      onSuccess?.();
    },
  });

  return { submit, isPending };
};

export const useAuthUser = () => {
  return useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      // Call Next.js API route (same origin) which proxies to backend with token
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Not authenticated');
      }
      const result = await response.json();
      return result.data || result;
    },
    staleTime: Infinity,      // Consider stale after 5 minutes
    retry: false,             // Don't retry failed requests
    throwOnError: false,      // Don't throw on error
    refetchOnWindowFocus: false,
  });
};
