import { CartItem } from "@/types/cart";
import trashIcon from "@/assets/trash.png"
import Image from "next/image";

interface Props {
    cartItem: CartItem,
    removeFromCart: (key: CartItem['key']) => void,
  };

export default function ItemCard({ cartItem, removeFromCart }: Props) {
  const { key, name, prices, image, quantity } = cartItem;

  return (
    <article
      key={key}
      className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      
      <div className="relative h-12 w-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-50">
        <Image
          src={image.src}
          alt={name}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {name}
        </p>
        <span className="text-xs text-gray-500">
          Qty: {quantity}
        </span>
      </div>

      <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
        ${prices.price}
      </p>

      <button
        onClick={() => removeFromCart(key)}
        className="p-1 rounded-md hover:bg-red-50 transition"
        aria-label="Remove item"
      >
        <Image
          src={trashIcon}
          alt="Remove"
          className="h-4 w-4 opacity-70 hover:opacity-100"
        />
      </button>
    </article>
  );
}
