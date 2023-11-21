import RegisterUserForm from '@/app/(auth)/cadastro-usuario/[token]/components/RegisterUserForm';
import { CardWithLogo } from '@/ui/CardWithLogo';

const CadastroUsuario = async ({ params }: { params: { token: string } }) => {
  return (
    <>
      <CardWithLogo>
        <RegisterUserForm />
      </CardWithLogo>
    </>
  );
};

export default CadastroUsuario;
