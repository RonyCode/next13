import { useForm } from 'react-hook-form';

import { SignInSchema } from '@/app/(auth)/login/schemas/SignInSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export const useFormLogin = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema),
    mode: 'all'
  });

  return {
    errors,
    setError,
    register,
    handleSubmit
  };
};
