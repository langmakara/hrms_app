import { useQuery } from '@tanstack/react-query';
import { AuthUser } from './types';

// Backend response structure for /auth/me
type AuthMeResponse = {
  data: AuthUser;
};

export const getAuthUser = async (): Promise<AuthUser | null> => {
  try {
    console.log('[DEBUG] Calling /api/auth/me...');
    // Call Next.js API route (not backend directly) so httpOnly cookie can be read server-side
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      console.log('[DEBUG] /api/auth/me failed with status:', response.status);
      return null;
    }

    const data = await response.json();
    console.log('[DEBUG] /api/auth/me response:', data);
    // Handle nested data structure if backend wraps response
    if (data && typeof data === 'object' && 'data' in data) {
      return (data as AuthMeResponse).data;
    }
    return data as AuthUser;
  } catch (error) {
    // Return null if not authenticated (cookie missing/invalid)
    console.log('[DEBUG] /api/auth/me failed:', error);
    return null;
  }
};

export const useUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['auth-user'],
    queryFn: () => getAuthUser(),
    staleTime: 5 * 60 * 1000, // Consider stale after 5 minutes
    retry: false,             // Don't retry failed requests
    throwOnError: false,      // Don't throw on error
    refetchOnWindowFocus: false,
  });

  return { data, isLoading };
};
