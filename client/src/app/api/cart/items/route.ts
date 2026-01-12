import { addItem } from "@/lib/api/woocommerce/cart";
import type { AddToCartRequest } from "@/types/api";

export async function POST(req: Request) {
  const { productId, quantity }: AddToCartRequest = await req.json();
  const cart = await addItem(productId, quantity);
  return Response.json(cart);
}