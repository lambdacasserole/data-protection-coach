import { type FC, type HTMLAttributes } from "react";

/**
 * A styled single-line text input field.
 */
export const TextField: FC<
  Omit<HTMLAttributes<HTMLInputElement>, "type" | "onChange"> & {
    onChange: (value: string) => void;
  }
> = ({ onChange, className, ...props }) => {
  return (
    <input
      type="text"
      className={`w-[640px] rounded border border-neutral-400 px-3 py-2 ${className}`}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  );
};
