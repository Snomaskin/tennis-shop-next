"use client";
import { Product } from "@/types/products";
import Image from "next/image";
import { useCartAddItem } from "@/stores/useCart";

export default function Card({
  product,
  onButtonClick,
}: {
  product: Product;
  onButtonClick?: () => void;
}) {
  const addItem = useCartAddItem();

  return (
    <article className="flex flex-col items-start rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <Image
        className="mb-4 h-48 w-full rounded-xl object-contain"
        src={product.image.src}
        alt={product.name}
        width={100}
        height={100}
        unoptimized={process.env.NODE_ENV === "development"}
      />

      <span className="mb-1 line-clamp-2 text-lg font-medium text-gray-800">
        {product.name}
      </span>

      <p className="mb-4 font-semibold text-green-600">
        ${product.prices.price.toFixed(2)}
      </p>

      <button
        className="mt-auto w-full cursor-pointer rounded-xl bg-blue-600 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        onClick={() => {
          onButtonClick?.();
          addItem(product.id);
        }}
      >
        Buy
      </button>
    </article>
  );
}
