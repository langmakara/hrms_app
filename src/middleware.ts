
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // ចាប់យក Cookie ដែលមានឈ្មោះថា isLoggedIn
  const isLoggedIn = request.cookies.get('isLoggedIn');
  const isLoginPage = request.nextUrl.pathname.startsWith('/login');

  // ១. បើ User មិនទាន់ Login ហើយព្យាយាមចូលទៅ Dashboard ឬទំព័រផ្សេងទៀត
  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ២. បើ User បាន Login ហើយ តែព្យាយាមត្រឡប់មកទំព័រ Login វិញ
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// កំណត់ថា Route ណាខ្លះដែល Middleware ត្រូវធ្វើការការពារ
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/employees/:path*', 
    '/payroll/:path*', 
    '/attendance/:path*',
    '/profile/:path*',
    '/request/:path*',
    '/login'
  ],
};