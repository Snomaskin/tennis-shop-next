import type { WooCommerceCart } from "@/types/cart";
import { client } from "./kyApi";

export async function getCart(): Promise<WooCommerceCart> {
  return client.get("cart").json();
}

export async function addItem(
  productId: number,
  quantity = 1,
): Promise<WooCommerceCart> {
  return client
    .post("cart/items", {
      json: { productId, quantity },
    })
    .json();
}

export async function removeItem(itemKey: string): Promise<WooCommerceCart> {
  return client.delete(`cart/items/${itemKey}`).json();
}

export async function updateItemQuantity(
  itemKey: string,
  quantity = 1,
): Promise<WooCommerceCart> {
  return client
    .patch(`cart/items/${itemKey}`, {
      json: { key: itemKey, quantity },
    })
    .json();
}
