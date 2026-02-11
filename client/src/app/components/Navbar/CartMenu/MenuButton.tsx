interface Props {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export default function MenuButton({ label, onClick }: Props) {

  return (
    <button
      onClick={onClick}
      className={`w-full px-6 py-4 rounded-xl font-semibold duration-300  shadow-lg hover:shadow-xl
        bg-yellow-100 hover:bg-yellow-200 text-neutral-900 border-2 border-neutral-200 hover:border-neutral-300 shadow-neutral-200/30 hover:shadow-neutral-300/40 relative overflow-hidden group cursor-pointer`}
    >

      <span className="relative z-10 flex items-center justify-center gap-2">
        {label}
        <svg
          className="w-5 h-5 group-hover:translate-x-1 group-hover:scale-190 duration-300"
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
