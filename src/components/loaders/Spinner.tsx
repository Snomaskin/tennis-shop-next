import { twMerge } from "tailwind-merge";

export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        "h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent",
        className,
      )}
    />
  );
}
