import { type FC, type ChangeEventHandler } from "react";

export const TextField: FC<{
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ onChange }) => {
  return (
    <input
      type="text"
      className="rounded border border-neutral-400 px-3 py-2 w-[640px]"
      onChange={onChange}
    />
  );
};
