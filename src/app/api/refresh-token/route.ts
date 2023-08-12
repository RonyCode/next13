import { NextRequest, NextResponse } from 'next/server';

import { limiter } from '@/app/api/config/limiter';

interface RefreshTokenType {
  codUsuario: number;
  refreshToken: string;
  token: string;
  email: string;
  accessToken?: boolean;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const origin: string | null = request.headers.get('origin');
  const remaining: number = await limiter.removeTokens(1);
  const body: RefreshTokenType = await request.json();
  const { email, codUsuario, refreshToken, token } = body;

  if (!email || !codUsuario || !refreshToken || !token)
    return NextResponse.json({ message: 'Erro parametros necessários' });

  if (remaining < 0) {
    return new NextResponse(null, {
      status: 429,
      statusText: 'To many requests',
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
  const tokenSanitized = token.replace('.', '+');

  const res = await fetch(
    `${process.env.API_GSO}/auth/refresh-token/${tokenSanitized}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin || '*',
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    const { message } = await res.json();
    return NextResponse.json({ message: message }, { status: 401 });
  }
  const { data } = await res.json();
  return NextResponse.json(data);
}
