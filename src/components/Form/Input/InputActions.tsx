import { ReactNode } from 'react';

interface InputProps {
  children: ReactNode;
}
const InputActions = ({ children }: InputProps) => {
  return <div>{children}</div>;
};
export default InputActions;
