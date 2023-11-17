import {
  ElementType,
  forwardRef,
  InputHTMLAttributes,
  LegacyRef,
  useId
} from 'react';

import { InputMask, InputMaskProps } from '@react-input/mask';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hasError?: string;
  registerInput?: string;
  mask?: string;
  icon?: ElementType;
  ref: LegacyRef<InputMaskProps> | undefined;
};

const InputmaskCustom = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name = '',
      label = '',
      hasError = '',
      type = 'text',
      icon: Icon,
      ...props
    },
    ref
  ) => {
    const inputId = useId();
    const error = hasError.length > 0;

    return (
      <div className=" min-w-screen flex flex-col">
        <label
          className="flex items-center gap-2 py-2 text-sm font-bold text-white"
          htmlFor={inputId}
        >
          <span>{Icon && <Icon size={18} />}</span>
          {label}
        </label>

        <InputMask
          {...props}
          type={type}
          replacement={{ _: /\d/ }}
          id={inputId}
          name={name}
          disabled={false}
          ref={ref}
          className={`${
            error
              ? 'border-pink-500 text-pink-600  focus:border-pink-500 focus:ring-pink-500'
              : 'focus:border-sky-500 focus:outline-none focus:ring-sky-500'
          }    rounded-md  border bg-white 
                      text-sm  text-black  placeholder-slate-400 
                      shadow-sm disabled:border-slate-200
                      disabled:bg-slate-50
                      disabled:text-slate-500 disabled:shadow-none`}
        />
      </div>
    );
  }
);
export default InputmaskCustom;
