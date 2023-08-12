import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const allowedOrigins =
    process.env.NODE_ENV === 'production'
      ? ['https://www.example.com']
      : ['http://localhost:3000', 'http://gsoapi/'];
  const origin = request.headers.get('origin');
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': origin || '*'
      }
    });
  }

  const token = request.cookies.get('token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (!token) {
    if (!refreshToken) {
      if (request.nextUrl.pathname === '/login') {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const res = await fetch(`${process.env.API_NEXT}/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(refreshToken)
    });

    const user = await res.json();

    if (!user.token) {
      console.log(user);
      return null;
    }
  }
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: ['/login', '/dashboard/:path*']
};
