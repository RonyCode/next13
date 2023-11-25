'use server';

import { toast } from 'react-toastify';

import { revalidatePath } from 'next/cache';

import { usePreRegister } from '@/app/(auth)/precadastro-usuario/hooks/usePreRegister/usePreRegister';
import { PreRegisterUserSchema } from '@/app/(auth)/precadastro-usuario/schemas/PreRegisterUserSchema';
import { userErrorRegisterStore } from '@/stores/user/userErrorRegisterStore';
import { UserRegisterError, UserType } from '@/types';

export const preRegisterUserServerActions = async (data: FormData) => {
  const { preRegisterUser } = usePreRegister();
  try {
    const formData = Object.fromEntries(data.entries());
    const result = PreRegisterUserSchema.safeParse(formData);

    if (result.success) {
      return await preRegisterUser(
        result.data as unknown as PreRegisterUserSchema
      );
    }
  } catch (error) {
    console.log(error);
  }
};
revalidatePath('/');
