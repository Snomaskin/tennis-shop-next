"use client";
import { Product } from "@/types/products";
import Image from "next/image";
import { forwardRef, useState } from "react";
import { useCartAddItem } from "@/stores/useCart";

export const Card = forwardRef<HTMLDivElement, { product: Product }>(
  ({ product }, ref) => {
    const [isSelected, setIsSelected] = useState(false);
    const addItem = useCartAddItem();

    return (
      <div ref={ref} className="absolute" onClick={() => setIsSelected(true)}>
        <article
          className="w-20 h-20 shrink-0 
            rounded-2xl border border-gray-200 
            bg-white
            shadow-sm transition-all
            hover:shadow-md hover:-translate-y-1 hover:scale-120
            rotate-30
            overflow-hidden
            cursor-pointer
          "
        >
          <Image
            src={product.image.src}
            alt={product.name}
            fill
            unoptimized={process.env.NODE_ENV === "development"}
          />
        </article>

        {isSelected && (
          <div>
            <span className="text-lg font-medium text-gray-800 mb-1 line-clamp-2">
              {product.name}
            </span>

            <p className="text-green-600 font-semibold mb-4">
              ${product.prices.price.toFixed(2)}
            </p>

            <button
              className="
          w-full mt-auto
          rounded-xl bg-blue-600 text-white 
          py-2 font-medium 
          transition-colors
          hover:bg-blue-700
          cursor-pointer
        "
              onClick={() => addItem(product.id)}
            >
              Buy
            </button>
          </div>
        )}
      </div>
    );
  },
);
