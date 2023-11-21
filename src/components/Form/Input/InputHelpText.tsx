'use client';
import { useFormRegister } from '@/app/(auth)/cadastro-usuario/[token]/hooks/useFormRegister';

interface InputLabelProps {
  text?: string;
}

const InputHelpText = ({ text }: InputLabelProps) => {
  const { errors, register } = useFormRegister();

  let hasError = false;
  if (text) hasError = text.length > 0;

  console.log(errors);
  return (
    <>
      <input {...register('cpf')} type="text" hidden />
      <div>{hasError && <p className="text-sm text-red-600">{text}</p>}</div>
    </>
  );
};
export default InputHelpText;
