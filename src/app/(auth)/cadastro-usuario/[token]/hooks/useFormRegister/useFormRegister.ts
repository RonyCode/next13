import { useForm } from 'react-hook-form';

import { RegisterUserSchema } from '@/app/(auth)/cadastro-usuario/[token]/schemas/RegisterUserSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export const useFormRegister = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterUserSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      email: '',
      nome: '',
      senha: '',
      confirmaSenha: '',
      telefone: ''
    }
  });

  return {
    errors,
    setError,
    register,
    handleSubmit
  };
};
