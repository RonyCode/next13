import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const allowedOrigins =
    process.env.NODE_ENV === 'production'
      ? [
          `${process.env.API_GSO}`,
          `${process.env.API_NEXT}`,
          `${process.env.NEXTAUTH_URL}`,
          'http://127.0.0.1:3000'
        ]
      : [
          `${process.env.API_GSO}`,
          `${process.env.API_NEXT}`,
          `${process.env.NEXTAUTH_URL}`,
          'http://127.0.0.1:3000'
        ];
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

  console.log(token);
  if (!token || Date.now() > JSON.parse(token).iat) {
    if (request.nextUrl.pathname === '/login') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/private/:path*',
    '/about/:path*',
    '/contact/:path*',
    '/profile/:path*'
  ]
};
