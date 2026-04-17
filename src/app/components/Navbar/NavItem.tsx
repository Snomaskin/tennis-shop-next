import Link from "next/link";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { type LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface Props {
  label: string;
  href?: string;
  onClick?: () => void;
  imgUrl?: string | StaticImageData;
  icon?: LucideIcon;
  badge?: string | number;
  isActive?: boolean;
}

export default function NavItem({
  label,
  href,
  imgUrl,
  icon: Icon,
  badge,
  onClick,
  isActive,
}: Props) {
  const className = twMerge(
    "shrink-0 flex items-center px-2 py-3 md:px-6 md:py-4 text-center rounded-3xl duration-300 cursor-pointer text-gray-700",
    "hover:backdrop-blur-sm hover:scale-105 hover:shadow-sm hover:ring-2 hover:ring-gray-200/60",
    "md:ring-1 md:ring-gray-200/70",
    "md:hover:ring-gray-100/50",
    isActive && "shadow-sm scale-105 ring-2 ring-gray-100/50 backdrop-blur-sm",
  );

  const content =
    imgUrl || Icon ? (
      <div className="relative flex items-center gap-1.5">
        <div className="relative shrink-0">
          {imgUrl ? (
            <Image src={imgUrl} alt={label} width={25} height={25} />
          ) : Icon ? (
            <Icon size={25} />
          ) : null}
          {badge && (
            <span className="absolute -top-2.5 right-0 text-sm text-green-600">
              {badge}
            </span>
          )}
        </div>
        <span className="hidden text-sm font-normal whitespace-nowrap md:inline">
          {label}
        </span>
      </div>
    ) : (
      <span className="hidden text-xs font-normal tracking-wide whitespace-nowrap md:inline">
        {label}
      </span>
    );

  if (onClick) {
    return (
      <button className={className} onClick={onClick}>
        {content}
      </button>
    );
  }

  return (
    <Link className={className} href={href || "#"}>
      {content}
    </Link>
  );
}
