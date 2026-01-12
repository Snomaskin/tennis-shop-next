interface AddToCartRequest {
  productId: number;
  quantity?: number;
}

interface UpdateCartItemRequest {
  quantity: number;
}

export type { AddToCartRequest, UpdateCartItemRequest }