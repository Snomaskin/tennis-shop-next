import type { WooCommerceCart } from "@/types/cart";
import { get, post } from "./fetcher";

export async function getCart(): Promise<WooCommerceCart> {
  const res = await get("/api/cart");
  return res.json();
}

export async function addItem(productId: number, quantity = 1): Promise<WooCommerceCart> {
  const res = await post("/api/cart/items", {data: { "productId": productId, "quantity": quantity} });
  return res.json();
}

export async function removeItem(itemKey: string): Promise<WooCommerceCart> {
  const res = await post(`/api/cart/items/${itemKey}`);
  return res.json();
}