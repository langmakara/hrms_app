import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useUser } from '@/services/auth/get-auth-user';
import Loading from './loading';
import { Box } from '@mui/material';

export type ProtectedProps = {
  children: ReactNode;
};

export const Protected = ({
  children,
}: ProtectedProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUser();

  useEffect(() => {
    if (!user.data && !user.isLoading) {
      router.replace('/login');
    }
  }, [user.data, user.isLoading, router]);

  if (user.isLoading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, height: "full" }}>
        <Loading />
      </Box>
    );
  }

  if (!user.data && !user.isLoading) return null;

  return <>{children}</>;
};
