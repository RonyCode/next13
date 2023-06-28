import { forwardRef, InputHTMLAttributes, useId } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helpText?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name = '', label = '', helpText = '', type = 'text', ...props }, ref) => {
    const inpuId = useId();
    const hasError = helpText.length > 0;
    return (
      <>
        <label
          className="mb-1 block text-sm font-bold text-gray-700"
          htmlFor={inpuId}
        >
          {label}
        </label>
        <input
          type={type}
          id={inpuId}
          name={name}
          {...props}
          ref={ref}
          className={`${
            hasError
              ? 'border-pink-500 text-pink-600  focus:border-pink-500 focus:ring-pink-500'
              : 'focus:border-sky-500 focus:outline-none focus:ring-sky-500'
          } block w-full rounded-md border  bg-white
                      px-3 py-2 text-sm  text-black placeholder-slate-400 
                      shadow-sm disabled:border-slate-200
                      disabled:bg-slate-50
                      disabled:text-slate-500 disabled:shadow-none`}
        />

        {hasError && <p className="mt-1 text-sm text-red-600">{helpText}</p>}
      </>
    );
  }
);
