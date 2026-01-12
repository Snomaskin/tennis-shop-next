import { get, post } from "../fetcher";
import type { WooCommerceCart } from "@/types/cart";

const BASE_URL = "http://test.local/wp-json/wc/store/cart";


async function fetchCart() {
  return get<WooCommerceCart>(BASE_URL);
}

async function addToCart(productId: number, quantity = 1) {
  return post<WooCommerceCart>(BASE_URL + "/add-item", { id: productId, quantity });
}

async function removeFromCart (productKey: string) {
  return post<WooCommerceCart>(BASE_URL + "/remove-item", { key: productKey });
}

export { fetchCart, addToCart, removeFromCart }