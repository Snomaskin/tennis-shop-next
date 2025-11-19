"use client"
import { Product } from "@/types/products";
import Image from "next/image";
import { useCart } from "@/stores/useCart";

export default function Card({ product }: { product: Product }) {
  const addItem  = useCart.getState().addItem;
  
  return (
    <article
      className="
        flex flex-col items-start 
        rounded-2xl border border-gray-200 
        bg-white p-4 
        shadow-sm transition-all 
        hover:shadow-md hover:-translate-y-1
      "
    >
      <Image
        className="w-full h-48 object-contain rounded-xl mb-4"
        src={product.image.src}
        alt={product.name}
        width={100}
        height={100}
      />

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
    </article>

  )
}