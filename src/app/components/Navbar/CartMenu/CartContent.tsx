import { Cart } from "@/types/cart";
import CartItem from "./CartItem";

export default function CartContent({ cart }: { cart: Cart }) {
  return (
    <div className="flex max-h-100 flex-1 flex-col overflow-hidden">
      <div className="scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent flex-1 space-y-3 overflow-y-auto px-6 py-4">
        <ul className="list-none space-y-3">
          {cart.items.map((item) => (
            <li key={item.id}>
              <CartItem item={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-neutral-200 bg-gradient-to-b from-white/80 to-neutral-50/80 px-6 py-5 backdrop-blur-sm">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm text-neutral-500">
            {cart.items_count} {cart.items_count > 1 ? "items" : "item"}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-base font-semibold text-neutral-700">
            Total
          </span>
          <span className="text-2xl font-bold tracking-tight text-neutral-900">
            ${cart.totals.total_price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
