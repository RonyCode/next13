import type { Account, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    cod_usuario: string;
    nome: string;
    email: string;
    image: string;
    senha: string;
    token: string;
    access_Token: string;
    refresh_token: string;
    data_expirar_token: number;
    expires_at: number;
  }

  interface User {
    cod_usuario: string;
    nome: string;
    email: string;
    image: string;
    senha: string;
    token: string;
    access_Token: string;
    refresh_token: string;
    data_expirar_token: number;
    expirezs_at: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    cod_usuario: string;
    nome: string;
    email: string;
    image: string;
    picture: string;
    senha: string;
    token: string;
    access_Token: string;
    refresh_token: string;
    data_expirar_token: number;
    expires_at: number;
  }
}
