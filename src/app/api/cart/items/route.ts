import { addWooItem } from "@/lib/api/woocommerce/cart";
import { getOrSetCartCookie } from "@/lib/cartSession";
import type { AddToWooCartRequest } from "@/types/api";

export async function POST(req: Request) {
  const session = await getOrSetCartCookie();
  const body = await req.json();
  const { productId, quantity }: AddToWooCartRequest = body;
  const cart = await addWooItem(productId, quantity, session);
  return Response.json(cart);
}