'use server';

import { cookies } from 'next/headers';

interface cookieType {
  name: string;
  value: string;
  httpOnly: boolean;
  dateExpires: number;
  path: string;
}

export async function setCookies({
  name,
  value,
  httpOnly,
  dateExpires,
  path
}: cookieType) {
  try {
    cookies().set({
      name: name,
      value: value,
      httpOnly: httpOnly,
      maxAge: dateExpires,
      path: path
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
