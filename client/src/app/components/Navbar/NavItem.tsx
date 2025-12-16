import Link from "next/link";

interface Props {
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export default function NavItem({ label, href, onClick, isActive }: Props) {
  const className = `
    flex items-center h-10 px-1 py-0.5 lg:px-6 lg:py-2 text-center rounded-full duration-300 cursor-pointer
    text-gray-700 hover:text-emerald-600 hover:bg-green-100 hover:scale-105 hover:shadow-lg
    ${isActive ? "text-emerald-600 bg-green-100 shadow-lg scale-105" : ""}
  `;

  if (onClick) {
    return (
      <button className={className} onClick={onClick}>
        <span className="text-black-100 text-shadow-2xl">{label}</span>
      </button>
    );
  }

  return (
    <Link className={className} href={href || "#"}>
      <span className="text-black-100 text-shadow-2xl">{label}</span>
    </Link>
  );
}