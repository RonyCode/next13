import type { Account, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

type UserId = string;

declare module 'next-auth' {
  interface Session {
    id: UserId;
    cod_usuario: string;
    nome: string;
    name: string;
    email: string;
    image: string;
    senha: string;
    token: string;
    id_token: Account.id_token;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: string;
  }

  interface User {
    id: UserId;
    cod_usuario: string;
    nome: string;
    name: string;
    email: string;
    image: string;
    senha: string;
    token: string;
    id_token: Account.id_token;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId;
    cod_usuario: string;
    nome: string;
    email: string;
    picture: string;
    senha: string;
    token: string;
    id_token: Account.id_token;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: string;
  }
}
