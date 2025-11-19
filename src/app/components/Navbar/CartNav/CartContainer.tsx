import { useCartState, useCartActions } from "@/stores/useCart";
import { useEffect } from "react";
import LoadingScreen from "@/components/loaders/LoadingScreen";
import EmptyCart from "@/components/Cart/EmptyCart";
import Error from "@/components/ErrorMessage";
import Cart from "@/components/Cart";

export default function CartContainer({ hideCart }: { hideCart: () => void; }) {
  const { cart, errorMessage, fetchStatus } = useCartState();
  const { loadCart } = useCartActions();

  useEffect(() => { loadCart() }, [loadCart]);

  if (fetchStatus === "loading") return <LoadingScreen />;
  if (fetchStatus === "error" && errorMessage) return <Error message={errorMessage} />;
  if (!cart?.items.length) return <EmptyCart />;

  return <Cart cart={cart} onCheckout={hideCart} />;
}