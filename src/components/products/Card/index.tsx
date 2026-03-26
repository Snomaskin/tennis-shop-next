"use client";
import { Product } from "@/types/products";
import Image from "next/image";
import ProductQuantityControl from "./ProductQuantityControl";
import { twMerge } from "tailwind-merge";
import Spinner from "@/components/loaders/Spinner";
import { useEffect, useState } from "react";

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
  const [loaded, setLoaded] = useState(false);

  return (
    <article
      className={twMerge(
        "flex flex-col items-start rounded-2xl border border-neutral-200/60 bg-white/50 p-4 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-md",
        cardStyles?.classNames,
      )}
    >
      <div className="relative mb-4 flex max-h-48 w-full items-center justify-center rounded-xl">
        {!loaded && (
          <div className="flex h-48 items-center justify-center">
            <Spinner />
          </div>
        )}
        <Image
          className={twMerge(
            "max-h-48 w-full rounded-xl object-contain transition-opacity duration-300",
            loaded ? "relative opacity-100" : "absolute opacity-0",
          )}
          src={product.image.src}
          alt={product.name}
          width={100}
          height={100}
          sizes="(max-width: 768px) 100vw, 300px"
          onLoad={() => setLoaded(true)}
        />
      </div>

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
