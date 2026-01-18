"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export function Loading({ message = "Loading...", fullScreen = false }: LoadingProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        ...(fullScreen && {
          position: "fixed",
          inset: 0,
          backgroundColor: "background.default",
          zIndex: 9999,
        }),
        ...(!fullScreen && {
          py: 4,
        }),
      }}
    >
      <CircularProgress color="primary" />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default Loading;
