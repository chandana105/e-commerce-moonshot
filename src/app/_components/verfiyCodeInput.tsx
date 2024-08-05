"use client";

interface InputParams {
  id: string;
  nextId?: string;
  prevId?: string;
  label: string;
}

const VerfiyCodeInput = ({ id, nextId, prevId, label }: InputParams) => {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        type="text"
        maxLength={1}
        data-focus-input-init
        data-focus-input-prev={prevId}
        data-focus-input-next={nextId}
        id={id}
        className="h-12 w-[46px] rounded-md border-app-border border-login-border p-3 text-center"
        required
      />
    </div>
  );
};

export default VerfiyCodeInput;
