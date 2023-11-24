import React from 'react';

import UserErrorRegisterInitializeStore from '@/stores/user/UserErrorRegisterInitializeStore';
import { userErrorRegisterStore } from '@/stores/user/userErrorRegisterStore';
import { useUserStore } from '@/stores/user/userStore';

const InitializeStores = () => {
  const dataUser = useUserStore.getState().state.user;
  const dataUserErro = userErrorRegisterStore.getState().user;
  console.log(dataUser);
  console.log(dataUserErro);

  return (
    <>
      <UserErrorRegisterInitializeStore userError={dataUserErro} />
    </>
  );
};

export default InitializeStores;
