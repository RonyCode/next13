import type { Account, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

import { type } from '@auth/core/types';

type UserId = string;

declare module 'next-auth' {
  interface Session {
    id: UserId;
    cod_usuario?: string;
    nome?: string;
    name?: string;
    email?: string;
    image?: string;
    senha?: string;
    id_token?: Account.id_token;
    accessToken?: string;
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    token?: string;
    exp?: number;
    iat?: number;
    jti?: string;
    access_token?: string;
    expires_in?: number;
    expires_at?: number;
    refresh_token?: string;
    error?: 'RefreshAccessTokenError';
  }

  interface User {
    id: UserId;
    cod_usuario: string;
    nome: string;
    name: string;
    email: string;
    image?: string;
    senha?: string;
    token?: string;
    id_token?: Account.id_token;
    accessToken?: string;
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    access_token?: string;
    expires_in?: number;
    expires_at?: number;
    refresh_token?: string;
    iat?: number;
    exp?: number;
    jti?: string;
    error?: 'RefreshAccessTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: UserId;
    cod_usuario?: string;
    nome?: string;
    email?: string;
    picture?: string;
    senha?: string;
    id_token?: Account.id_token;
    accessToken?: string;
    access_token?: string;
    refreshTokenExpires?: number;
    accessTokenExpires?: Account.expires_at;
    expires_in?: number;
    expires_at?: number;
    refresh_token?: string;
    refreshToken?: string;
    token?: string;
    iat?: number;
    exp?: number;
    jti?: string;
    error?: 'RefreshAccessTokenError';
  }
}
