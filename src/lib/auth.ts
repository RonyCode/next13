import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { SignInSchema } from '@/app/(auth)/login/schemas/SignInSchema';
import { limiter } from '@/app/api/config/limiter';

function getGoogleCredentials() {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!googleClientId || !googleClientSecret) {
    throw new Error('Missing Google credentials');
  }

  return {
    clientId: googleClientId,
    clientSecret: googleClientSecret
  };
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },

  pages: {
    signIn: '/login'
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret
    }),

    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'exemplo@email.com'
        },
        senha: { label: 'Senha', type: 'password' }
      },

      async authorize(credentials, req) {
        const payload = {
          email: credentials?.email,
          senha: credentials?.senha
        };

        if (!payload.email || !payload.senha) {
          throw new Error('Por favor digite um email e uma senha válidos');
        }

        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const user = await res.json();

        if (!user.token) {
          return null;
        }

        if (res.ok && user) {
          cookies().set('token', user.token, {
            maxAge: 2 * 24 * 60 * 60,
            path: '/',
            httpOnly: true
          });
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  secret: process.env.JWT_SECRET,

  theme: {
    colorScheme: 'auto',
    brandColor: '',
    logo: '/images/logo.png'
  },

  debug: process.env.NODE_ENV === 'development',

  callbacks: {
    jwt: async function ({ token, user, account }) {
      if (account && user)
        return {
          ...token,
          cod_usuario: user.cod_usuario,
          id: user.id,
          nome: user.nome || user.name,
          email: user.email,
          picture: user.image,
          token: user.token,
          id_token: account.id_token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires
        };

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.cod_usuario = token.cod_usuario;
        session.nome = token.nome;
        session.email = token.email;
        session.image = token.picture;
        session.token = token.token || token.id_token;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.accessTokenExpires = token.accessTokenExpires;
      }
      return session;
    }
  }
};
