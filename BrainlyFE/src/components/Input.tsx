import { forwardRef } from "react";

interface InputProps {
  placeholder: string;
  type: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type }, ref) => {
    return (
      <div>
        <input ref={ref} placeholder={placeholder} type={type} className="px-4 py-2 border rounded m-2" />
      </div>
    );
  }
);
