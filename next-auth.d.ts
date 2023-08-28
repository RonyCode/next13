import { type Account, Session, User, DefaultSession } from 'next-auth';
import NextAuth from 'next-auth';

//
//
// declare module 'next-auth' {
//   interface Session {
//     user: User;
//   }
//
//   interface User  {
//     cod_usuario: string;
//     nome: string;
//     email: string;
//     image: string;
//     picture: string;
//     senha: string;
//     token: string;
//     access_Token: string;
//     refresh_token: string;
//     data_expirar_token: number;
//     expires_at: number;
//   }
// }
//
// declare module 'next-auth/jwt' {
//   interface JWT {
//     cod_usuario: string;
//     nome: string;
//     email: string;
//     image: string;
//     picture: string;
//     senha: string;
//     token: string;
//     access_Token: string;
//     refresh_token: string;
//     data_expirar_token: number;
//     expires_at: number;
//   }
// }

declare module 'next-auth' {
  interface User {
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

  // interface Session {
  //   user: {
  //     cod_usuario: string;
  //     nome: string;
  //     email: string;
  //     image: string;
  //     picture: string;
  //     senha: string;
  //     token: string;
  //     access_Token: string;
  //     refresh_token: string;
  //     data_expirar_token: number;
  //     expires_at: number;
  //   };
  // }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
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
