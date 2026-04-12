"use client";
import { Order } from "@/types/orders";
import TennisCourt from "@/components/backgrounds/TennisCourt";
import OrderCard from "./OrderCard";

export default function AccountLanding({ orders }: { orders: Order[] }) {
  return (
    <main className="relative flex min-h-screen max-w-2xl min-w-screen justify-center overflow-hidden bg-amber-100 px-4 pb-5">
      <TennisCourt shadowIntensity={3} />
      <div className="flex max-w-1/2 min-w-1/2 flex-col items-center justify-center gap-2">
        <div className="flex w-full flex-col items-center self-center rounded-2xl border border-neutral-200/60 bg-white/50 p-5 backdrop-blur-sm">
          <h1 className="text-2xl font-semibold text-neutral-800">Orders</h1>
          <p className="mt-1 text-sm text-neutral-400">Your placed orders</p>
        </div>

        <div className="flex w-full flex-col items-center gap-3">
          {orders.length === 0 ? (
            <div className="flex w-full flex-col items-center rounded-2xl border border-neutral-200/60 bg-white/50 p-8 backdrop-blur-sm">
              <p className="text-sm text-neutral-400">No orders yet.</p>
            </div>
          ) : (
            orders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </div>
      </div>
    </main>
  );
}
