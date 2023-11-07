import { FC } from 'react';

import RegisterUserForm from '@/app/(auth)/cadastra-usuario/components/RegisterUserForm';
import { CardWithLogo } from '@/ui/CardWithLogo';

const CadastroUsuario: FC = async () => {
  return (
    <>
      <CardWithLogo>
        <RegisterUserForm />
      </CardWithLogo>
    </>
  );
};

export default CadastroUsuario;
