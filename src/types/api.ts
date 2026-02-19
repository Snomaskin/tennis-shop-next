import { CartSession } from "@/lib/cartSession";

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

export type { AddToWooCartRequest, UpdateWooCartItemRequest }