"use client";
import CartItem from "@/app/components/Navbar/CartMenu/CartItem";
import { useCartData } from "@/stores/useCart";
import { useCheckout } from "../hooks/useCheckout";
import { MoveRight } from "lucide-react";

export default function Overview() {
  const cart = useCartData();
  const { next } = useCheckout();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-4 pt-22 pb-5">
      {cart && (
        <div className="flex w-full flex-col gap-5 rounded-2xl border border-neutral-200/60 bg-white/50 p-5 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-neutral-800">
              Order Overview
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Great picks! And such affordable prices too.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-neutral-400">
                {cart.items_count} {cart.items_count === 1 ? "item" : "items"}
              </span>
              <span className="text-xl font-semibold text-neutral-800">
                Total: ${cart.totals.total_price}
              </span>
            </div>

            <button
              type="button"
              onClick={() => next()}
              className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-emerald-400 px-5 py-2.5 text-base font-semibold text-white duration-200 hover:ring-3 hover:ring-yellow-300/90 disabled:cursor-not-allowed"
              disabled={cart.items_count === undefined || cart.items_count <= 0}
            >
              Shipping
              <span className="text-base leading-none duration-200 group-hover:translate-x-0.5 group-hover:scale-120">
                <MoveRight size={20} />
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
