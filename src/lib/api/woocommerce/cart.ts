import { get, post } from "../fetcher";
import type { WooCommerceCart } from "@/types/cart";
import type { CartSession } from "@/lib/cartSession";
import createUrlWithQuery from "../utils/createUrlWithQuery";

const BASE_URL = "http://test.local/wp-json/wc/store/cart";

function createCartHeaders(session: CartSession): Headers {
  return new Headers({
    "Cookie": session.cookieHeader,
    "Cart-Token": session.cartToken
  });
}

async function getWooCart(session: CartSession): Promise<WooCommerceCart> {
  const res = await get(BASE_URL, { headers: createCartHeaders(session)});
  return res.json();
}

async function addWooItem(id: number, quantity = 1, session: CartSession): Promise<WooCommerceCart> {
  const url = createUrlWithQuery(BASE_URL + "/add-item", [{ "id": id }, { "quantity": quantity }])
  const res = await post(url, { headers: createCartHeaders(session)});
  return res.json();
}

async function removeWooItem (key: string, session: CartSession): Promise<WooCommerceCart> {
  const url = createUrlWithQuery(BASE_URL + "/remove-item", [{ key }])
  const res = await post(url, { headers: createCartHeaders(session)});
  return res.json();
}

async function updateWooItem (key: string, quantity: number, session: CartSession): Promise<WooCommerceCart> {
  const url = createUrlWithQuery(BASE_URL + "/update-item", [{ key }, { quantity }])
  const res = await post(url, { headers: createCartHeaders(session)} );
  return res.json();
}

export { getWooCart, addWooItem, removeWooItem, updateWooItem }