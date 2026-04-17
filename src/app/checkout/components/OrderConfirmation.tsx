"use client";
import { useCartReset, useCartData } from "@/stores/useCart";
import CartItem from "@/app/components/Navbar/CartMenu/CartItem";
import { PackageCheck, Truck, MapPin, CircleAlert } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { CheckoutFormSchema } from "@/config/checkout/schema";
import { useCheckout } from "../hooks/useCheckout";
import Link from "next/link";
import LoadingScreen from "@/components/loaders/LoadingScreen";

export default function OrderConfirmation() {
  const cart = useCartData();
  const resetCart = useCartReset();
  const {
    httpStatus,
    orderId,
    errorMessage,
    reset: resetCheckout,
  } = useCheckout();
  const { getValues } = useFormContext<CheckoutFormSchema>();
  const shippingValues = getValues("shipping");

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden">
      {httpStatus === 200 && orderId ? (
        <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-4 pt-22 pb-5">
          <div className="flex w-full flex-col gap-5 rounded-2xl border border-neutral-200/60 bg-white/50 p-5 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15">
                <PackageCheck size={28} className="text-emerald-500" />
              </div>
              <h2 className="text-2xl font-semibold text-neutral-800">
                Order {orderId} Confirmed!
              </h2>
              <p className="mt-1 max-w-4/5 text-center text-sm text-neutral-400">
                Thank you for shopping with us. Order can be retrieved from the
                account page if it was placed while logged in.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-2 rounded-xl border border-neutral-200/60 p-4">
                <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
                  <Truck size={15} className="text-emerald-400" />
                  <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                    Estimated Delivery
                  </span>
                </div>
                <p className="text-sm font-semibold text-neutral-800">
                  3-5 Business Days
                </p>
                <p className="text-xs text-neutral-400">
                  You'll receive a tracking email shortly
                </p>
              </div>

              <div className="flex flex-col gap-2 rounded-xl border border-neutral-200/60 p-4">
                <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
                  <MapPin size={15} className="text-emerald-400" />
                  <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                    Delivering To
                  </span>
                </div>
                <p className="text-sm font-semibold text-neutral-800">
                  {shippingValues.firstName} {shippingValues.lastName}
                </p>
                <p className="text-sm text-neutral-500">
                  {shippingValues.street}
                </p>
                <p className="text-sm text-neutral-500">
                  {shippingValues.postCode} {shippingValues.city},{" "}
                  {shippingValues.country}
                </p>
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
                      {cart.items_count}{" "}
                      {cart.items_count === 1 ? "item" : "items"}
                    </span>
                    <span className="text-xl font-semibold text-neutral-800">
                      Total: ${cart.totals.total_price}
                    </span>
                  </div>

                  <Link
                    href="/"
                    className="group flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:ring-3 hover:ring-yellow-300/90"
                    onClick={() => {
                      resetCheckout();
                      resetCart();
                    }}
                  >
                    Continue Shopping
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      ) : errorMessage ? (
        <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-4 pt-22 pb-5">
          <div className="flex w-full flex-col items-center gap-3 rounded-2xl border border-neutral-200/60 bg-white/50 p-6 backdrop-blur-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15">
              <CircleAlert size={28} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-semibold text-neutral-800">
              oops, something went wrong :-\
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Error: {errorMessage}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <LoadingScreen />
        </div>
      )}
    </div>
  );
}
