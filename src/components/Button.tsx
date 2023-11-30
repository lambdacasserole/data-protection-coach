import { type HTMLAttributes, type FC } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  text: string;
  loading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  checked,
  text,
  loading,
  ...props
}) => {
  return (
    <button
      className="rounded border border-blue-800 bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 active:bg-blue-800"
      {...props}
    >
      {loading ? "Loading..." : `${text}${checked ? " ✓" : ""}`}
    </button>
  );
};
