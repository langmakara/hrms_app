import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that don't require authentication
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password'];

// Roles that can access protected routes (non-public, non-admin)
const GENERAL_ACCESS_ROLES = ['HR', 'ADMIN'];

// Roles that can access /admin/* routes
const ADMIN_ONLY_ROLES = ['ADMIN'];

/**
 * Decode JWT payload without verification.
 * Verification happens on the backend when the token is used.
 */
function decodeJwtPayload(token: string): { sub?: string; email?: string; roles?: string[] } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Check if current route is public
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
  const isAdminRoute = pathname.startsWith('/admin');

  // 1. If no token and trying to access protected route → redirect to login
  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. If has token and trying to access login → redirect to dashboard
  if (token && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. Role-based protection (only for authenticated users on protected routes)
  if (token && !isPublicRoute) {
    const payload = decodeJwtPayload(token);
    const userRoles = payload?.roles || [];

    if (isAdminRoute) {
      // /admin/* routes: ADMIN only
      const hasAdminAccess = ADMIN_ONLY_ROLES.some(role => userRoles.includes(role));
      if (!hasAdminAccess) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } else {
      // All other protected routes: HR or ADMIN
      const hasGeneralAccess = GENERAL_ACCESS_ROLES.some(role => userRoles.includes(role));
      if (!hasGeneralAccess) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  // 4. Clone request headers and add Authorization for API routes
  const requestHeaders = new Headers(request.headers);
  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
