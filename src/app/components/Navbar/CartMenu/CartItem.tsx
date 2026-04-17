import type { CartItem } from "@/types/cart";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import ProductQuantityControl from "@/components/products/Card/ProductQuantityControl";

export default function CartItem({
  item,
  className,
  qtyControl = true,
}: {
  item: CartItem;
  className?: string;
  qtyControl?: boolean;
}) {
  return (
    <div
      className={twMerge(
        `group relative flex max-w-80 items-center gap-4 rounded-xl border border-neutral-200/60 p-4 backdrop-blur-sm duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-lg sm:max-w-none`,
        className,
      )}
    >
      <div className="relative h-20 w-20 rounded-lg shadow-sm">
        <Image
          src={item.image.src}
          alt={item.name}
          height={100}
          width={100}
          className="h-full w-full overflow-hidden rounded-lg object-cover duration-500 group-hover:scale-105"
        />

        <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-300/60 text-xs font-semibold text-white shadow-lg">
          {item.quantity}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate">{item.name}</h3>

          <p>${item.prices.price.toFixed(2)}</p>
        </div>
        {qtyControl && (
          <div className="max-w-25 shrink-0">
            <ProductQuantityControl product={item} />
          </div>
        )}
      </div>
    </div>
  );
}
