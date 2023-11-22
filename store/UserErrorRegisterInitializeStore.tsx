'use client';

import { useRef } from 'react';

import { UserType } from '../types';
import { userErrorRegisterStore } from './userErrorRegisterStore';
import { useUserStore } from './userStore';

type InitializeProps = {
  userError: UserType;
};

const UserStoreInitialize = ({ userError }: InitializeProps) => {
  console.log(userError);
  console.log('teste');
  userErrorRegisterStore.setState({ user: userError });

  return null;
};
export default UserStoreInitialize;
