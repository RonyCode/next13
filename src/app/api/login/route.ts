import { NextRequest, NextResponse } from 'next/server';

import { limiter } from '@/app/api/config/limiter';
import { loginValidator } from '@/lib/validations/login-validator';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const origin: string | null = request.headers.get('origin');
  const remaining: number = await limiter.removeTokens(1);
  const body: Login = await request.json();
  const { email, senha } = loginValidator.parse(body);

  if (!email || !senha)
    return NextResponse.json({ message: 'Missing required data' });

  if (remaining < 0) {
    return new NextResponse(null, {
      status: 429,
      statusText: 'To many requests',
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }

  const res = await fetch(`${process.env.API_URL_DEVELOPMENT}/login/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin || '*'
    },
    body: JSON.stringify({ email, senha })
  });

  if (!res.ok) {
    const { message } = await res.json();
    return NextResponse.json({ message: message });
  }
  const { data } = await res.json();
  return NextResponse.json(data);
}
