import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define public paths that shouldn't require authentication
  const isAuthPage = 
    pathname.startsWith('/login') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password');
    
  // Check for the presence of the authentication token cookie
  const token = request.cookies.get('transitops-token')?.value;

  // 1. Redirect authenticated users away from auth pages to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. Redirect unauthenticated users trying to access dashboard/portal areas to login page
  const isProtectedPage = 
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/vehicles') ||
    pathname.startsWith('/drivers') ||
    pathname.startsWith('/trips') ||
    pathname.startsWith('/maintenance') ||
    pathname.startsWith('/fuel') ||
    pathname.startsWith('/expenses') ||
    pathname.startsWith('/reports') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/notifications');

  if (isProtectedPage && !token) {
    const loginUrl = new URL('/login', request.url);
    // Optional: Keep track of redirect URL
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Next.js middleware configuration matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, logos, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
