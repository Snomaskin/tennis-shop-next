"use client";
import { useFormContext } from "react-hook-form";
import type { CheckoutFormSchema } from "@/config/checkout/checkoutSchema";
import { useCartData } from "@/stores/useCart";
import CartItem from "@/app/components/Navbar/CartMenu/CartItem";
import { useCheckout } from "../hooks/useCheckout";
import { checkoutSteps } from "@/config/checkout/checkoutSteps";
import { MoveLeft, MoveRight, MapPin, CreditCard } from "lucide-react";
import { useEffect } from "react";

export default function Review() {
  const cart = useCartData();
  const { getValues } = useFormContext<CheckoutFormSchema>();
  const shippingValues = getValues("shipping");
  const paymentValues = getValues("payment");
  const { next, prev, stepIndex } = useCheckout();
  const prevStepLabel = checkoutSteps[stepIndex - 1]?.label;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-4 px-4 pt-22 pb-5">
      <div className="mb-2 flex w-full flex-col items-center self-center rounded-2xl border border-neutral-200/60 bg-white/50 p-5 backdrop-blur-sm">
        <h2 className="text-2xl font-semibold text-neutral-800">
          Review Order
        </h2>
        <p className="mt-1 text-sm text-neutral-400">
          Confirm your details before placing the order
        </p>
      </div>

      <div className="flex w-full max-w-2xl flex-col gap-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-2xl border border-neutral-200/60 bg-white/50 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
              <MapPin size={15} className="text-emerald-400" />
              <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                Shipping
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-neutral-800">
                {shippingValues.firstName} {shippingValues.lastName}
              </p>
              <p className="text-sm text-neutral-500">
                {shippingValues.street}
              </p>
              <p className="text-sm text-neutral-500">
                {shippingValues.zipCode} {shippingValues.city}
              </p>
              <p className="text-sm text-neutral-500">
                {shippingValues.country}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-2xl border border-neutral-200/60 bg-white/50 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
              <CreditCard size={15} className="text-emerald-400" />
              <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                Payment
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-neutral-800">
                {paymentValues.cardHolder}
              </p>
              <p className="text-sm text-neutral-500">
                •••• •••• •••• {paymentValues.cardNumber.slice(-4)}
              </p>
              <p className="text-sm text-neutral-500">
                Exp. date: {paymentValues.expiryDate}
              </p>
            </div>
          </div>
        </div>

        {cart && (
          <>
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

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => prev()}
                  className="group flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-500 transition-all duration-200 hover:border-neutral-300 hover:text-neutral-700"
                >
                  <span className="text-base leading-none transition-transform duration-200 group-hover:-translate-x-0.5">
                    <MoveLeft size={16} />
                  </span>
                  {prevStepLabel}
                </button>

                <button
                  onClick={() => next()}
                  className="group flex cursor-pointer items-center gap-2 rounded-xl border-2 border-transparent bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:border-yellow-300"
                >
                  Place Order
                  <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5">
                    <MoveRight size={20} />
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
