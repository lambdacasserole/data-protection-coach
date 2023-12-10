import { type HTMLAttributes, type FC } from "react";

export interface CheckButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Whether or not this button is checked.
   */
  checked?: boolean;

  /**
   * The text to display in this button.
   */
  text: string;

  /**
   * Whether or not this button is currently in a loading state.
   */
  loading?: boolean;
}

/**
 * A button component that supports a checked/unchecked state.
 */
export const CheckButton: FC<CheckButtonProps> = ({
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
