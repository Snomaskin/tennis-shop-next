"use client";
import { Order } from "@/types/orders";
import TennisCourt from "@/components/backgrounds/TennisCourt";
import OrderCard from "./OrderCard";
import { useRouter } from "next/navigation";
import { client } from "@/lib/api/kyApi";

export default function AccountLanding({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const handleLogout = () => {
    client.post("auth/logout").then(() => {
      router.push("/login");
      router.refresh();
    });
  };

  return (
    <main className="relative flex min-h-screen max-w-2xl min-w-screen justify-center overflow-hidden bg-amber-100 px-4 pt-22 pb-5">
      <TennisCourt shadowIntensity={3} />
      <div className="flex min-w-1/2 flex-col items-center justify-center gap-2">
        <div className="flex w-full items-center justify-center self-center rounded-2xl border border-neutral-200/60 bg-white/50 p-5 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold text-neutral-800">Orders</h1>
            <p className="mt-1 text-sm text-neutral-400">Your placed orders</p>
          </div>
          <button
            className="text-md absolute top-2 right-2 cursor-pointer rounded-lg bg-red-500/80 p-1.5 font-light text-white shadow-sm duration-200 hover:bg-red-500 hover:ring-2 hover:ring-red-300/80"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>

        <div className="flex w-full flex-col items-center gap-3">
          {orders.length === 0 ? (
            <div className="flex w-full flex-col items-center rounded-2xl border border-neutral-200/60 bg-white/50 p-8 backdrop-blur-sm">
              <p className="text-sm text-neutral-400">No orders yet</p>
            </div>
          ) : (
            orders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </div>
      </div>
    </main>
  );
}
