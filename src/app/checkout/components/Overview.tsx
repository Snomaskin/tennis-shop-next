"use client";
import CartItem from "@/app/components/Navbar/CartMenu/CartItem";
import { useCartData } from "@/stores/useCart";
import { useCheckout } from "../hooks/useCheckout";
import LoadingScreen from "@/components/loaders/LoadingScreen";
import { MoveRight } from "lucide-react";

export default function Overview() {
  const cart = useCartData();
  const { next } = useCheckout();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-4 px-4 pt-22 pb-5">
      <div className="mb-2 flex w-full flex-col items-center self-center rounded-2xl border border-neutral-200/60 bg-white/50 p-5 backdrop-blur-sm">
        <h2 className="text-2xl font-semibold text-neutral-800">
          Order Overview
        </h2>
        <p className="mt-1 text-sm text-neutral-400">
          Review your items before continuing
        </p>
      </div>

      {cart && (
        <div className="flex w-full max-w-2xl flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between rounded-2xl border border-neutral-200/60 bg-white/50 p-4 backdrop-blur-sm">
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
              className="group flex cursor-pointer items-center gap-2 rounded-xl border-2 border-transparent bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:border-yellow-300"
            >
              Shipping
              <span className="text-base leading-none duration-200 group-hover:translate-x-0.5 group-hover:scale-120">
                <MoveRight size={20} />
              </span>{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
