import { Category } from "@/types/products";
import Image from "next/image";
import Link from "next/link";

export default function MenuItem({ item }: { item: Category }) {
  return (
    <Link
      href={`/shop/${item.slug}`}
      className="flex w-16 h-16 rounded-full items-center justify-center hover:-translate-y-1 hover:shadow-lg duration-200 cursor-pointer  group"
    >
      <Image
        src={item.image.src}
        alt={item.image.name}
        width={100}
        height={100}
        className="w-8 h-8 object-contain hover:scale-110 duration-200"
        unoptimized={process.env.NODE_ENV === 'development'}
      />
    </Link>
  );
}
