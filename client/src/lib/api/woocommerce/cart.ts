import { get, post } from "../fetcher";
import type { WooCommerceCart } from "@/types/cart";

const BASE_URL = "http://test.local/wp-json/wc/store/cart";

async function getCart(): Promise<WooCommerceCart> {
  const res = await get(BASE_URL);
  return res.json();
}

async function addItem(id: number, quantity = 1): Promise<WooCommerceCart> {
  const res = await post(BASE_URL + "/add-item", { id, quantity });
  return res.json();
}

async function removeItem (key: string): Promise<WooCommerceCart> {
  const res = await post(BASE_URL + "/remove-item", { key });
  return res.json();
}

async function updateItem (key: string, quantity: number): Promise<WooCommerceCart> {
  const res = await post(BASE_URL + "/update-item", { key, quantity });
  return res.json();
}

export { getCart, addItem, removeItem, updateItem }