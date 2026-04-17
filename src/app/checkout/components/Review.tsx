"use client";
import { useFormContext } from "react-hook-form";
import type { CheckoutFormSchema } from "@/config/checkout/schema";
import { useCartData } from "@/stores/useCart";
import CartItem from "@/app/components/Navbar/CartMenu/CartItem";
import { useCheckout } from "../hooks/useCheckout";
import { checkoutSteps } from "@/config/checkout/steps";
import { MoveLeft, MoveRight, MapPin, CreditCard } from "lucide-react";

export default function Review() {
  const cart = useCartData();
  const { getValues } = useFormContext<CheckoutFormSchema>();
  const shippingValues = getValues("shipping");
  const paymentValues = getValues("payment");
  const { next, prev, stepIndex } = useCheckout();
  const prevStepLabel = checkoutSteps[stepIndex - 1]?.label;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-4 pt-22 pb-5">
      <div className="flex w-full flex-col gap-5 rounded-2xl border border-neutral-200/60 bg-white/50 p-5 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-neutral-800">
            Order Review
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-xl border border-neutral-200/60 p-4">
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
                {shippingValues.postCode} {shippingValues.city}
              </p>
              <p className="text-sm text-neutral-500">
                {shippingValues.country}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-xl border border-neutral-200/60 p-4">
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
                <CartItem key={item.id} item={item} qtyControl={false} />
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

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => prev()}
                  className="group flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-500 duration-200 hover:border-neutral-300 hover:text-neutral-700"
                >
                  <span className="text-base leading-none transition-transform duration-200 group-hover:-translate-x-0.5">
                    <MoveLeft size={16} />
                  </span>
                  {prevStepLabel}
                </button>

                <button
                  onClick={() => next()}
                  className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-emerald-400 px-5 py-2.5 text-base font-semibold text-white duration-200 hover:ring-3 hover:ring-yellow-300/90"
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
