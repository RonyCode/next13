import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const test1 = cookies().getAll();
  //
  // async function getCookieParser() {
  //   'use server';
  //   const test2 = await getCookieParser();
  //   console.log(test2);
  // }
  // console.log(test1);
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
  console.log('middleware');
  return NextResponse.next();

  // return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: '/api/:path*'
};
