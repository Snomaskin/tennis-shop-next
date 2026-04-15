import { Order } from "@/types/orders";
import Image from "next/image";

const statusStyles: Record<string, string> = {
  completed: "bg-emerald-100 text-emerald-700",
  processing: "bg-amber-100 text-amber-700",
  pending: "bg-neutral-100 text-neutral-500",
  cancelled: "bg-red-100 text-red-500",
  refunded: "bg-blue-100 text-blue-600",
  failed: "bg-red-100 text-red-500",
};

function formatPrice(cents: string) {
  return (Number(cents) / 10).toFixed(2);
}

export default function OrderCard({ order }: { order: Order }) {
  const statusClass =
    statusStyles[order.status] ?? "bg-neutral-100 text-neutral-500";

  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-neutral-200/60 bg-white/50 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-700">
            Order #{order.id}
          </p>
          <p className="text-xs text-neutral-400">
            {order.shipping.first_name} {order.shipping.last_name} ·{" "}
            {order.shipping.address_1}, {order.shipping.postcode},{" "}
            {order.shipping.city}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusClass}`}
        >
          {order.status}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {order.line_items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            {item.image && (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-neutral-200/60 bg-white">
                <Image
                  src={item.image.src}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-1 items-center justify-between">
              <p className="text-sm text-neutral-700">{item.name}</p>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span>x{item.quantity}</span>
                <span className="text-neutral-600">
                  ${formatPrice(item.price)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end border-t border-neutral-100 pt-2">
        <p className="text-sm font-semibold text-neutral-800">
          Total: ${formatPrice(order.total)}
        </p>
      </div>
    </div>
  );
}
