import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password'];
const GENERAL_ACCESS_ROLES = ['HR', 'ADMIN'];
const ADMIN_ONLY_ROLES = ['ADMIN'];

/**
 * Decode JWT payload without verification.
 * Verification happens on the backend when the token is used.
 */
function decodeJwtPayload(token: string): { sub?: string; email?: string; roles?: string[]; exp?: number } | null {
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
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route));
  const isAdminRoute = pathname.startsWith('/admin');

  // Validate token if present
  if (token) {
    const payload = decodeJwtPayload(token);

    if (!payload || (payload.exp && Date.now() >= payload.exp * 1000)) {
      // Invalid or expired token
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_token');
      return response;
    }

    // Redirect authenticated users away from login
    if (pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Role-based access on protected routes
    if (!isPublicRoute) {
      const userRoles = (payload.roles || []).map((r: string) => r.toUpperCase());

      if (isAdminRoute) {
        const hasAdminAccess = ADMIN_ONLY_ROLES.some(role => userRoles.includes(role.toUpperCase()));
        if (!hasAdminAccess) {
          return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
      } else {
        const hasGeneralAccess = GENERAL_ACCESS_ROLES.some(role => userRoles.includes(role.toUpperCase()));
        if (!hasGeneralAccess) {
          return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
      }
    }
  } else {
    // No token - redirect to login for protected routes
    if (!isPublicRoute) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
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
