import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { cookies } from 'next/headers';

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
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
      authorization: { params: { access_type: 'offline', prompt: 'consent' } }
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

      async authorize(credentials) {
        const payload = {
          email: credentials?.email,
          senha: credentials?.senha
        };

        if (!payload.email || !payload.senha) {
          throw new Error('Email ou senha inválido! 🤯');
        }

        const res = await fetch(`${process.env.API_NEXT}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const user = await res.json();
        if (!user.token) {
          return null;
        }

        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],

  theme: {
    colorScheme: 'auto',
    brandColor: '',
    logo: '/images/logo.png'
  },

  session: {
    strategy: 'jwt',
    maxAge: 15
  },

  pages: {
    signIn: '/login'
  },

  secret: process.env.JWT_SECRET,
  debug: process.env.NODE_ENV === 'development',

  callbacks: {
    jwt: async function ({ token, user, account }) {
      if (account && user) {
        let userGoogle;
        if (account.provider === 'google') {
          const payload = {
            email: token?.email,
            senha: token?.sub,
            nome: token?.name,
            image: token?.picture
          };

          const res = await fetch(`${process.env.API_NEXT}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (res.ok) {
            userGoogle = await res.json();
          } else {
            return null;
          }
        }

        console.log(JSON.stringify(userGoogle));
        console.log(JSON.stringify(user));
        // Save the access token and refresh token in the JWT on the initial login
        cookies().set('token', user.token! && userGoogle.data.token!, {
          maxAge: 900,
          path: '/',
          httpOnly: true
        });

        cookies().set(
          'refresh_token',
          user.refresh_token! && userGoogle.refresh_token!,
          {
            maxAge: 3600 * 12,
            path: '/',
            httpOnly: true
          }
        );
        //=====================================================================

        return {
          ...token,
          cod_usuario: user.cod_usuario && userGoogle.cod_usuario,
          nome: user.nome && userGoogle.nome,
          email: user.email && userGoogle.email,
          image: user.image && userGoogle.image,
          access_Token: user.token && userGoogle.token,
          refresh_token: user.refresh_token && userGoogle.refresh_token,
          expires_at: user.data_expirar_token && userGoogle.data_expirar_token
        };
      }
    },

    async session({ session, token }) {
      if (token) {
        session.cod_usuario = token.cod_usuario;
        session.nome = token.nome;
        session.email = token.email;
        session.image = token.image;
        session.token = token.token;
        session.access_Token = token.access_Token;
        session.refresh_token = token.refresh_token;
        return session;
      }
    }
  }
};
