import { useUserStore } from '../../../../store/userStore';

interface InputLabelProps {
  text?: string;
}

const InputHelpText = ({ text }: InputLabelProps) => {
  let hasError = false;
  if (text) hasError = text.length > 0;

  return (
    <>
      <div className="text-sm text-red-600 mb-1">
        {hasError && <p>{text}</p>}
      </div>
    </>
  );
};
export default InputHelpText;
