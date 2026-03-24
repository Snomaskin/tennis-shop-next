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
    "shrink-0 flex items-center px-1 py-4 lg:px-6 text-center hover:backdrop-blur-sm rounded-3xl duration-300 cursor-pointer text-gray-700  hover:scale-105 hover:shadow-lg hover:ring-gray-100/50 hover:ring-2",
    isActive && "shadow-lg scale-105 ring-2 ring-gray-100/50 backdrop-blur-sm",
  );

  const content =
    imgUrl || Icon ? (
      <div className="relative px-4">
        {imgUrl ? (
          <Image src={imgUrl} alt={label} width={25} height={25} />
        ) : Icon ? (
          <Icon size={25} />
        ) : null}
        {badge && (
          <span className="absolute -top-2.5 right-4 text-sm text-green-600">
            {badge}
          </span>
        )}
      </div>
    ) : (
      <span className="text-black-100 text-shadow-2xl whitespace-nowrap">
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
