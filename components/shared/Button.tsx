import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className = "", ...props }: Props) {
  return (
    <button
      {...props}
      className={`rounded-full bg-ink px-4 py-2 text-sm text-sand ${className}`.trim()}
    />
  );
}
