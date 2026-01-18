import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import { createSession, deleteSession } from '@/lib/session';

import { AuthUser, LoginData } from './types';

// Expected response shape from your backend
type LoginResponse = {
  data: {
    token: string  // Backend returns 'access_token', not 'token'
  }
};

export const login = (data: LoginData): Promise<LoginResponse> => {
  return apiClient.post('/auth/login', data);
};

type UseLoginOptions = {
  onSuccess?: () => void; // Changed: no user param since backend only returns token
};

export const useLogin = ({
  onSuccess,
}: UseLoginOptions = {}) => {
  const { mutate: submit, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async (response: LoginResponse) => {
      console.log('[DEBUG] Login response:', response);
      const { data } = response;
      // Store token
      if (data.token) {
        console.log('[DEBUG] Token received, storing...');
        await createSession(data.token);
        console.log('[DEBUG] Token stored');
        onSuccess?.();
      } else {
        console.log('[DEBUG] No token in response');
      }
    },
  });

  return { submit, isPending };
};

// Logout
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
  } catch {
    // Ignore logout API errors
  }
  // Clear httpOnly cookie
  await deleteSession();
  // Clear TanStack Query cache
  queryClient.clear();
};

export const useLogout = (onSuccess?: () => void) => {
  const { mutate: submit, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      onSuccess?.();
    },
  });

  return { submit, isPending };
};
