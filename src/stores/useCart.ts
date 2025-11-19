import { create } from "zustand";
import { Cart, WooCommerceCart } from "@/types/cart";
import { fetchCart, addToCart, removeFromCart } from "@/api/woocommerce/cart";
import { createCart } from "@/api/woocommerce/utils/cart";
import { FetchStatus } from "@/types/general";
import { getErrorMessage } from "@/utils/errors";

interface CartState {
  cart: Cart | null;
  fetchStatus: FetchStatus;
  errorMessage: string | null;
  loadCart: () => Promise<void>;
  addItem: (itemId: number, quantity?: number) => Promise<void>;
  removeItem: (itemKey: string) => Promise<void>;
  clearCart: () => void;
  resetCart: () => void;
}

const useCart = create<CartState>((set, get) => {
  const runCartAction = async (action: () => Promise<WooCommerceCart>) => {
    set({ fetchStatus: "loading", errorMessage: null });
    try {
      const wooCommerceCart = await action();

      const tennisCart = createCart(wooCommerceCart);
      set({ cart: tennisCart, fetchStatus: "success" });
    } catch (e) {
      const errorMessage = getErrorMessage(e);
        set({ errorMessage, fetchStatus: "error" });
    }
  }
  
  return {
    cart: null,
    fetchStatus: "idle",
    errorMessage: null,

    loadCart: () => runCartAction(() => fetchCart()),
    addItem: (productId, quantity) => runCartAction(() => addToCart(productId, quantity)),
    removeItem: (itemKey) => (runCartAction(() => removeFromCart(itemKey))),
    clearCart: () => {
      const items = get().cart?.items;
      if (!items) return;

      for (const item of items) {
        get().removeItem(item.key);
      }
    },
    resetCart: () => set({ cart: null, errorMessage: null, fetchStatus: "idle" }),
}});

const useCartState = () =>
  useCart(state => ({
    cart: state.cart,
    errorMessage: state.errorMessage,
    fetchStatus: state.fetchStatus,
  }));

const useCartActions = () =>
  useCart(state => ({
    loadCart: state.loadCart,
    addItem: state.addItem,
    removeItem: state.removeItem,
    clearCart: state.clearCart,
    resetCart: state.resetCart,
  }));

export { useCart, useCartState, useCartActions }