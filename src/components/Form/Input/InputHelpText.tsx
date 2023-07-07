interface InputLabelProps {
  text?: string;
}

const InputHelpText = ({ text }: InputLabelProps) => {
  let hasError = false;
  if (text) hasError = text.length > 0;

  return (
    <div>{hasError && <p className="text-sm text-red-600">{text}</p>}</div>
  );
};
export default InputHelpText;
