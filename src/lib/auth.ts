import type { NextAuthOptions, TokenSet } from 'next-auth';
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
  session: {
    strategy: 'jwt',
    maxAge: 15
  },

  pages: {
    signIn: '/login'
  },
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
          senha: credentials?.senha,
          role: 'user'
        };

        if (!payload.email || !payload.senha) {
          throw new Error('Por favor digite um email e uma senha válidos');
        }

        const res = await fetch(`${process.env.API_NEXT}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const user = await res.json();
        process.on('uncaughtException', function (err) {
          console.log(err);
        });
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
  secret: process.env.JWT_SECRET,

  theme: {
    colorScheme: 'auto',
    brandColor: '',
    logo: '/images/logo.png'
  },

  debug: process.env.NODE_ENV === 'development',

  callbacks: {
    jwt: async function ({ token, user, account }) {
      if (account && user) {
        // Save the access token and refresh token in the JWT on the initial login
        cookies().set('token', user.token! || account.id_token!, {
          maxAge: 5,
          path: '/',
          httpOnly: true
        });

        cookies().set(
          'refresh_token',
          user.refresh_token! || account.refresh_token!,
          {
            maxAge: 45,
            path: '/',
            httpOnly: true
          }
        );

        return {
          ...token,
          cod_usuario: user.cod_usuario,
          id: user.id,
          nome: user.nome || user.name,
          email: user.email,
          picture: user.image,
          accessToken: user.token || account?.id_token,
          accessTokenExpires: Math.floor(
            Date.now() / 2000000 + account.expires_at!
          ),
          refreshToken: account.refresh_token || user.refresh_token,
          expires_at: Math.floor(Date.now() / 2000000 + account.expires_at!),
          refresh_token: account.refresh_token
        };
      } else if (Date.now() < token.expires_at! * 2000000) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        // If the access token has expired, try to refresh it
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch('https://oauth2.googleapis.com/token', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID!,
              client_secret: process.env.GOOGLE_CLIENT_SECRET!,
              grant_type: 'refresh_token',
              refresh_token: token.refresh_token!
            }),
            method: 'POST'
          });

          const tokens: TokenSet = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_at!),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token
          };
        } catch (error) {
          console.error('Error refreshing access token', error);
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: 'RefreshAccessTokenError' as const };
        }
      }
    },

    async session({ session, token }) {
      if (token) {
        session.id = token.id!;
        session.cod_usuario = token.cod_usuario;
        session.nome = token.nome;
        session.email = token.email;
        session.image = token.picture;
        session.token = token.token || token.id_token;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken || token.refresh_token;
        session.accessTokenExpires = token.accessTokenExpires;
      }

      return session;
    }
  }
};
