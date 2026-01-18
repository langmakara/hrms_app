import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import Loading from './loading';
import { Box } from '@mui/material';
import { useAuthUser } from '@/services/auth/auth-service';

export type ProtectedProps = {
  children: ReactNode;
};

export const Protected = ({
  children,
}: ProtectedProps) => {
  const router = useRouter();
  const { data, isLoading, error } = useAuthUser();

  useEffect(() => {
    if (!isLoading && (!data || error)) {
      router.replace('/login');
    }
  }, [data, isLoading, error, router]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, height: "full" }}>
        <Loading />
      </Box>
    );
  }

  return children;
};
