interface Props {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export default function MenuButton({ label, onClick }: Props) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={`group relative w-full cursor-pointer overflow-hidden rounded-xl border-2 border-neutral-200 bg-yellow-100 px-6 py-4 font-semibold text-neutral-900 shadow-lg shadow-neutral-200/30 duration-300 hover:border-neutral-300 hover:bg-yellow-200 hover:shadow-xl hover:shadow-neutral-300/40`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {label}
        <svg
          className="h-5 w-5 duration-300 group-hover:translate-x-1 group-hover:scale-190"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </span>
    </button>
  );
}
