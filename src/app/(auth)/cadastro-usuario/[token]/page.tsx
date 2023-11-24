import { Suspense } from 'react';

import { UserForm } from '@/app/(auth)/cadastro-usuario/[token]/components/UserForm';
import Loading from '@/app/(auth)/cadastro-usuario/[token]/loading';
import { CardWithLogo } from '@/ui/CardWithLogo';

const CadastroUsuario = () => {
  return (
    <>
      <CardWithLogo>
        <Suspense fallback={<Loading />}>
          <UserForm />
        </Suspense>
      </CardWithLogo>
    </>
  );
};

export default CadastroUsuario;
