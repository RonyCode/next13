import RegisterUserForm from '@/app/(auth)/cadastro-usuario/[token]/components/RegisterUserForm';
import { CardWithLogo } from '@/ui/CardWithLogo';

const CadastroUsuario = async ({ params }: { params: { token: string } }) => {
  return (
    <>
      <div>My Post: {params.token}</div>
      <CardWithLogo>
        <RegisterUserForm />
      </CardWithLogo>
    </>
  );
};

export default CadastroUsuario;
