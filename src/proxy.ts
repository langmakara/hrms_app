import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    // ចាប់យក Cookie និង URL path
    const isLoggedIn = request.cookies.get('isLoggedIn');
    const isLoginPage = request.nextUrl.pathname.startsWith('/login');
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin-dashboard');

    // ១. បើ User មិនទាន់ Login ហើយព្យាយាមចូលទៅ Dashboard ឬទំព័រផ្សេងទៀត
    if (!isLoggedIn && !isLoginPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // ២. បើ User បាន Login ហើយ តែព្យាយាមត្រឡប់មកទំព័រ Login វិញ
    if (isLoggedIn && isLoginPage) {
        // Redirect ទៅ dashboard សមស្របតាម role (សម្រាប់ performance)
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // ៣. ការពារ Admin Routes - សម្រាប់ Admin ប៉ុណ្ណោះ
    if (isAdminRoute && isLoggedIn) {
        // ចំណាំ: ត្រូវពិនិត្យ role នៅ Server-side ជាមួយ access_token ពីក្រោយ
        // នេះជា basic protection តែប៉ុណ្ណោះ
        // ធ្វើការពិនិត្យ role បន្ថែមនៅក្នុង Admin dashboard pages
        const response = NextResponse.next();
        return response;
    }

    return NextResponse.next();
}

// កំណត់ថា Route ណាខ្លះដែល Proxy ត្រូវធ្វើការការពារ
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin-dashboard/:path*',  // បន្ថែម admin dashboard routes
        '/employees/:path*',
        '/payroll/:path*',
        '/attendance/:path*',
        '/profile/:path*',
        '/request/:path*',
        '/login'
    ],
};
