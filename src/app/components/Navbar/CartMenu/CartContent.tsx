import { Cart } from "@/types/cart";
import CartItem from "./CartItem";

export default function CartContent({ cart }: { cart: Cart }) {

  return (
    <div className="flex flex-col h-100 flex-1 overflow-hidden">

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
        <ul className="list-none space-y-3">
          {cart.items.map(item => (
            <li key={item.id}>
              <CartItem item={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-neutral-200 px-6 py-5 bg-gradient-to-b from-white/80 to-neutral-50/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-1">

          <span className="text-sm text-neutral-500">
            {cart.items_count} {cart.items_count > 1 ? "items" : "item"} 
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-base font-semibold text-neutral-700">Total</span>
          <span className="text-2xl font-bold text-neutral-900 tracking-tight">
            ${cart.totals.total_price.toFixed(2)}
          </span>
        </div>
      </div>

    </div>
  );
}
