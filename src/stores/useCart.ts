import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import { Cart, WooCommerceCart } from "@/types/cart";
import { createCart } from "@/lib/api/woocommerce/utils/cart";
import { FetchStatus } from "@/types/general";
import { getErrorMessage } from "@/lib/utils/errors";
import { getCart, addItem, removeItem } from "@/lib/api/cart";

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

    loadCart: () => runCartAction(() => getCart()),
    addItem: (productId, quantity) => runCartAction(() => addItem(productId, quantity)),
    removeItem: (itemKey) => (runCartAction(() => removeItem(itemKey))),
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
  useCart(useShallow(state => ({
    cart: state.cart,
    errorMessage: state.errorMessage,
    fetchStatus: state.fetchStatus,
  })));

const useCartActions = () =>
  useCart(useShallow(state => ({
    loadCart: state.loadCart,
    addItem: state.addItem,
    removeItem: state.removeItem,
    clearCart: state.clearCart,
    resetCart: state.resetCart,
  }))); 

const useCartData = () => useCart(state => state.cart);
const useCartError = () => useCart(state => state.errorMessage);
const useCartStatus = () => useCart(state => state.fetchStatus);
const useCartLoadCart = () => useCart(state => state.loadCart);
const useCartAddItem = () => useCart(state => state.addItem);
const useCartRemoveItem = () => useCart(state => state.removeItem);
const useCartClear = () => useCart(state => state.clearCart);
const useCartReset = () => useCart(state => state.resetCart);

export { useCartState, useCartActions, useCart, useCartData, useCartError, useCartStatus, 
  useCartLoadCart, useCartAddItem, useCartRemoveItem, useCartClear, useCartReset }