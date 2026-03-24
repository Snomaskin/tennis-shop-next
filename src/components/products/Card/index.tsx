"use client";
import { Product } from "@/types/products";
import Image from "next/image";
import ProductQuantityControl from "./ProductQuantityControl";
import { twMerge } from "tailwind-merge";

type Props = {
  product: Product;
  cardStyles?: {
    classNames?: string;
  };
  footerStyles?: {
    className?: string;
    classNames?: {
      container?: string;
      addButton?: string;
      plusMinusButtons?: string;
      input?: string;
    };
  };
};

export default function Card({ product, cardStyles, footerStyles }: Props) {
  return (
    <article
      className={twMerge(
        "flex flex-col items-start rounded-2xl border border-neutral-200/60 bg-white/50 p-4 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-md",
        cardStyles?.classNames,
      )}
    >
      <Image
        className="mb-4 max-h-48 w-full rounded-xl object-contain"
        src={product.image.src}
        alt={product.name}
        width={100}
        height={100}
      />

      <span className="mb-1 line-clamp-2 text-lg font-semibold text-neutral-800">
        {product.name}
      </span>

      <p className="mb-4 text-sm font-medium text-neutral-400">
        ${product.prices.price.toFixed(2)}
      </p>

      <ProductQuantityControl product={product} styles={footerStyles} />
    </article>
  );
}
