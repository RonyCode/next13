import RegisterUserForm from '@/app/(auth)/cadastro-usuario/[token]/components/RegisterUserForm';
import { UserForm } from '@/app/(auth)/cadastro-usuario/[token]/components/UserForm';
import { CardWithLogo } from '@/ui/CardWithLogo';

import UserErrorRegisterInitializeStore from '../../../../../store/UserErrorRegisterInitializeStore';
import { userErrorRegisterStore } from '../../../../../store/userErrorRegisterStore';
import { useUserStore } from '../../../../../store/userStore';
import UserStoreInitialize from '../../../../../store/userStoreInitialize';

const CadastroUsuario = async ({ params }: { params: { token: string } }) => {
  const dataUser = useUserStore.getState().state.user;
  const dataUserError = userErrorRegisterStore.getState().user;

  return (
    <>
      <CardWithLogo>
        <UserForm />
        <UserStoreInitialize user={dataUser} />
        <UserErrorRegisterInitializeStore userError={dataUserError} />
        <RegisterUserForm />
      </CardWithLogo>
    </>
  );
};

export default CadastroUsuario;
