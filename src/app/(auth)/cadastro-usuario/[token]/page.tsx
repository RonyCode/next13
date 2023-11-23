import DataServerUser from '@/app/(auth)/cadastro-usuario/[token]/components/dataServerUser';
import { UserForm } from '@/app/(auth)/cadastro-usuario/[token]/components/UserForm';
import { CardWithLogo } from '@/ui/CardWithLogo';

import UserErrorRegisterInitializeStore from '../../../../../store/UserErrorRegisterInitializeStore';
import { userErrorRegisterStore } from '../../../../../store/userErrorRegisterStore';
import { useUserStore } from '../../../../../store/userStore';
import UserStoreInitialize from '../../../../../store/userStoreInitialize';

const CadastroUsuario = ({ params }: { params: { token: string } }) => {
  const dataUser = useUserStore.getState().state.user;
  const dataUserErro = userErrorRegisterStore.getState().user;
  console.log(dataUser);
  console.log(dataUserErro);
  return (
    <>
      <CardWithLogo>
        <UserForm />
        <UserStoreInitialize user={dataUser} />
        <UserErrorRegisterInitializeStore userError={dataUserErro} />
      </CardWithLogo>
    </>
  );
};

export default CadastroUsuario;
