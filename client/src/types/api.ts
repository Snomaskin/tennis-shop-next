import { CartSession } from "@/lib/session";

interface AddToWooCartRequest {
  productId: number;
  quantity?: number;
  session: CartSession;
}

interface UpdateWooCartItemRequest {
  quantity: number;
  session: CartSession;
}

export type { AddToWooCartRequest, UpdateWooCartItemRequest }