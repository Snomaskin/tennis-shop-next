import Link from "next/link";
import Image  from "next/image";
import { StaticImageData } from "next/image";

interface Props {
  label: string;
  href?: string;
  onClick?: () => void;
  imgUrl?: string | StaticImageData;
  badge?: string | number;
  isActive?: boolean;
};

export default function NavItem({ label, href, imgUrl, badge, onClick, isActive }: Props) {
  const className = `
    flex items-center h-10 px-2 py-0.5 lg:px-6 lg:py-2 text-center rounded-full duration-300 cursor-pointer
    text-gray-700 hover:text-emerald-600 hover:bg-green-100 hover:scale-105 hover:shadow-lg
    ${isActive ? "text-emerald-600 bg-green-100 shadow-lg scale-105" : ""}
  `;

  if (onClick) {
    return (
      <button className={className} onClick={onClick}>
        
        {imgUrl
          ? <div className="relative px-4">
              <Image src={imgUrl} alt={label} width={25} height={25} />
              {badge &&
                <span className="absolute -top-2.5 right-4 text-sm text-green-600">{badge}</span>
              }
            </div>
          : <span className="text-black-100 text-shadow-2xl">{label}</span>
        }

      </button>
    );
  };

  return (
    <Link className={className} href={href || "#"}>
      {imgUrl
        ? <div className="relative px-4">
            <Image src={imgUrl} alt={label} width={25} height={25} />
            {badge &&
              <span className="absolute -top-2.5 right-4 text-sm text-green-600">{badge}</span>
            }
          </div>
        : <span className="whitespace-nowrap text-black-100 text-shadow-2xl">{label}</span>
      }
    </Link>
  );
}