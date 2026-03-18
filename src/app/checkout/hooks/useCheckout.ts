import { CheckoutResponseBody } from "@/types/api";
import { create } from "zustand";

interface CheckoutState {
  stepIndex: number;
  orderId: number | null;
  errorMessage: string | null;
  httpStatus: number | null;

  next: () => void;
  prev: () => void;
  setCheckoutRes: (res: CheckoutResponseBody, status?: number) => void;
  setCheckoutError: (message: string, status: number) => void;
  reset: () => void;
}

export const useCheckout = create<CheckoutState>((set) => ({
  stepIndex: 0,
  orderId: null,
  errorMessage: null,
  httpStatus: null,

  next: () => set((s) => ({ stepIndex: s.stepIndex + 1 })),
  prev: () => set((s) => ({ stepIndex: s.stepIndex - 1 })),

  setCheckoutRes: (res: CheckoutResponseBody, status = 200) => {
    set({ orderId: res.data.order_id, httpStatus: status });
  },

  setCheckoutError: (message, status) =>
    set({ errorMessage: message, httpStatus: status }),

  reset: () =>
    set({
      stepIndex: 0,
      orderId: null,
      errorMessage: null,
      httpStatus: null,
    }),
}));
