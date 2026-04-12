import { woo } from "../kyApi";
import type { WooCommerceCart } from "@/types/cart";
import type { CartSession } from "@/lib/sessions/cart";

function createCartHeaders(session: CartSession) {
  return {
    Cookie: session.cookieHeader,
    "Cart-Token": session.cartToken,
  };
}

async function getWooCart(session: CartSession): Promise<WooCommerceCart> {
  return woo
    .get("cart", {
      headers: createCartHeaders(session),
    })
    .json<WooCommerceCart>();
}

async function addWooItem(
  id: number,
  quantity = 1,
  session: CartSession,
): Promise<WooCommerceCart> {
  return woo
    .post("cart/add-item", {
      headers: createCartHeaders(session),
      searchParams: { id, quantity },
    })
    .json<WooCommerceCart>();
}

async function removeWooItem(
  key: string,
  session: CartSession,
): Promise<WooCommerceCart> {
  return woo
    .post("cart/remove-item", {
      headers: createCartHeaders(session),
      searchParams: { key },
    })
    .json<WooCommerceCart>();
}

async function updateWooItem(
  key: string,
  quantity: number,
  session: CartSession,
): Promise<WooCommerceCart> {
  return woo
    .post("cart/update-item", {
      headers: createCartHeaders(session),
      searchParams: { key, quantity },
    })
    .json<WooCommerceCart>();
}

export { getWooCart, addWooItem, removeWooItem, updateWooItem };
