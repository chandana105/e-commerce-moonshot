"use client";

import useFocusInput from "../hooks/useFocusInput";

interface InputParams {
  id: string;
  nextId?: string;
  prevId?: string;
  label: string;    
  value: string;
  onChange: (value: string) => void;
}

const VerifyCodeInput = ({ id, nextId, prevId, label, value, onChange }: InputParams) => {
  const inputRef = useFocusInput(nextId, prevId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        type="text"
        maxLength={1}
        ref={inputRef}
        id={id}
        value={value}
        onChange={handleChange}
        className="h-12 w-[46px] rounded-md border-app-border border-login-border p-3 text-center"
        required
      />
    </div>
  );
};

export default VerifyCodeInput;
