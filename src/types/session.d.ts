export interface UserSession {
  name: string;
  email: string;
  image: string;
  id: string;
  token: string;
  refreshToken: string;
  accessTokenExpires: number;
  accessToken: string;
  message: string;
}
