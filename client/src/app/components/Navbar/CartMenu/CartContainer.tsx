import { useCartState, useCartActions } from "@/stores/useCart";
import { useEffect } from "react";
import EmptyCart from "@/components/Cart/EmptyCart";
import Error from "@/components/ErrorMessage";
import CartContent from "./CartContent";
import MenuButton from "./MenuButton";
import { useRouter } from "next/navigation";
import X from "@/components/icons/X";

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

  if (fetchStatus === "error" && errorMessage) return <Error message={errorMessage} />;
  if (!cart?.items.length) return <EmptyCart />;

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-neutral-50 via-white to-neutral-100/50 rounded-2xl shadow-2xl border border-neutral-200/60 overflow-hidden">

      <div className="px-6 py-5 border-b border-neutral-200/60 bg-white/80">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Your Cart</h2>
          </div>
          <button
            onClick={hideCart}
            className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-700 transition-all duration-200 hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <CartContent cart={cart} />

      <div className="px-6 py-5 border-t border-neutral-200/60 bg-white/80">
        <MenuButton
          label="Proceed to Checkout"
          onClick={handleCheckout}
        />
      </div>
    </div>
  );
}
