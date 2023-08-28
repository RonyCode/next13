interface LoginForm {
  handleSubmitLogin: FormData<FormDataEvent>;
  signInWithGoogle: () => Promise<void>;
  errors: z.Errors<SignInSchema>;
  isLoading: boolean;
  email: string;
  senha: string;
  nome: string;
  image: string;
}
