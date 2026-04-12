import { CartSession } from "@/lib/sessions/cart";

interface AddToWooCartRequest {
  productId: number;
  quantity?: number;
  session: CartSession;
}

interface UpdateWooCartItemRequest {
  key: string;
  quantity: number;
  session: CartSession;
}

interface CheckoutResponseBody {
  data: { order_id: number; status: string };
}

export type {
  AddToWooCartRequest,
  UpdateWooCartItemRequest,
  CheckoutResponseBody,
};
