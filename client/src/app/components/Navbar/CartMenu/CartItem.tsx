import type { CartItem } from "@/types/cart";
import Image from "next/image";
import { useCartRemoveItem } from "@/stores/useCart";
import X from "@/components/icons/X";

export default function CartItem({ item }: { item: CartItem }) {
  const removeItem = useCartRemoveItem();

  return (
    <div className="group relative flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-neutral-200/60 hover:border-neutral-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">

      <div className="relative w-20 h-20 rounded-lg bg-neutral-100 shadow-sm">
        <Image
          src={item.image.src}
          alt={item.name}
          height={100}
          width={100}
          unoptimized={process.env.NODE_ENV === 'development'}
          className="object-cover w-full h-full group-hover:scale-105 rounded-lg transition-transform duration-500 overflow-hidden"
        />

        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs font-semibold flex items-center justify-center shadow-lg ring-2 ring-white">
          {item.quantity}
        </div>
      </div>

      <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate">{item.name}</h3>
          <p>${item.prices.price.toFixed(2)}</p>
        </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              removeItem(item.key);
            }}
            className="absolute right-4 w-5 h-5 hidden rounded-full bg-red-500 group-hover:flex items-center justify-center text-white hover:bg-red-600 transition-colors duration-200 cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
      </div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-50/0 to-teal-50/0 group-hover:from-emerald-50/30 group-hover:to-teal-50/20 pointer-events-none transition-all duration-300" />
    </div>
  );
}
