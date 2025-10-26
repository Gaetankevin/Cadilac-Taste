import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protect /admin routes server-side. Exempt /admin/login to avoid redirect loops.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only handle admin routes
  if (!pathname.startsWith('/admin')) return NextResponse.next()

  // Allow the global login page and public admin assets
  if (pathname === '/login' || pathname.startsWith('/admin/public') ) return NextResponse.next()

  // Check cookie named 'admin'
  const adminCookie = req.cookies.get('admin')?.value
  if (adminCookie === '1') return NextResponse.next()

  // Not authenticated -> redirect to login (server-side)
  const loginUrl = req.nextUrl.clone()
  loginUrl.pathname = '/login'
  // preserve return URL so we can redirect back after login
  loginUrl.searchParams.set('returnTo', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/:path*'],
}
