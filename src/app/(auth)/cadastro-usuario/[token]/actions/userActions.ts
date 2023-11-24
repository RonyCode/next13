'use server';

import { revalidatePath } from 'next/cache';

import { RegisterUserSchema } from '@/app/(auth)/cadastro-usuario/[token]/schemas/RegisterUserSchema';
import { userErrorRegisterStore } from '@/stores/user/userErrorRegisterStore';
import { useUserStore } from '@/stores/user/userStore';
import { UserRegisterError, UserType } from '@/types';

export async function submitUserForm(formData: FormData) {
  const formaDataEntries = Object.fromEntries(formData.entries());
  const result = RegisterUserSchema.safeParse(formaDataEntries);

  if (result.success) {
    useUserStore.getState().actions.add(result.data as UserType);
    // redirect('/dashboard');
  }

  let zodErros: UserType;
  let resultParse: UserRegisterError = { errors: null, success: true };

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErros = {
        ...zodErros,
        [issue.path[0]]: issue.message
      };

      Object.keys(zodErros).length > 0 &&
        (resultParse = { errors: zodErros, success: false });
    });
  }

  revalidatePath('/');
  userErrorRegisterStore.getState().add(resultParse.errors as UserType);

  return resultParse;
}
