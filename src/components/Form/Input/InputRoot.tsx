import { InputHTMLAttributes, ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}
const InputRoot = ({ children, ...rest }: InputProps) => {
  return (
    <section className={twMerge(' min-w-screen flex flex-col', rest.className)}>
      {children}
    </section>
  );
};
export default InputRoot;
