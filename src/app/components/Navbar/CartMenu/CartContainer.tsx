import { useCartState, useCartActions } from "@/stores/useCart";
import { useEffect } from "react";
import EmptyCart from "./EmptyCart";
import Error from "@/components/ErrorMessage";
import CartContent from "./CartContent";
import MenuButton from "./MenuButton";
import { useRouter } from "next/navigation";
import X from "@/components/icons/X";
import Spinner from "@/components/loaders/Spinner";

export default function CartContainer({ hideCart }: { hideCart: () => void }) {
  const { cart, errorMessage, fetchStatus } = useCartState();
  const { loadCart } = useCartActions();
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
    hideCart();
  };

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  if (fetchStatus === "loading" && cart === undefined)
    return (
      <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-yellow-200">
        <Spinner />
      </div>
    );
  if (fetchStatus === "error" && errorMessage)
    return <Error message={errorMessage} />;
  if (!cart?.items.length) return <EmptyCart />;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/60 bg-linear-to-b from-white/20 to-white/80 shadow-2xl sm:min-w-120">
      <div className="border-b border-neutral-200/60 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-neutral-900">
              Your Cart
            </h2>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              hideCart();
            }}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-neutral-500 duration-200 hover:rotate-90 hover:text-neutral-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <CartContent cart={cart} />

      <div className="border-t border-neutral-200/60 px-6 py-5">
        <MenuButton label="Proceed to Checkout" onClick={handleCheckout} />
      </div>
    </div>
  );
}
