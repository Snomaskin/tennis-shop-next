import type { CartItem } from "@/types/cart";
import Image from "next/image";
import { useCartRemoveItem } from "@/stores/useCart";
import X from "@/components/icons/X";

export default function CartItem({ item }: { item: CartItem }) {
  const removeItem = useCartRemoveItem();

  return (
    <div className="group relative flex items-center gap-4 rounded-xl border border-neutral-200/60 bg-white/50 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-lg">
      <div className="relative h-20 w-20 rounded-lg bg-neutral-100 shadow-sm">
        <Image
          src={item.image.src}
          alt={item.name}
          height={100}
          width={100}
          className="h-full w-full overflow-hidden rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-semibold text-white shadow-lg ring-2 ring-white">
          {item.quantity}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate">{item.name}</h3>
          <p>${item.prices.price.toFixed(2)}</p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            removeItem(item.key);
          }}
          className="absolute right-4 hidden h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white transition-colors duration-200 group-hover:flex hover:bg-red-600"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-50/0 to-teal-50/0 transition-all duration-300 group-hover:from-emerald-50/30 group-hover:to-teal-50/20" />
    </div>
  );
}
