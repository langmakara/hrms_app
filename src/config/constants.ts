export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : null) as string;

export const ROLE_NAME = {
  ADMIN: "admin",
  USER: "user",
  MANAGER: "manager",
  HR: "hr",
}