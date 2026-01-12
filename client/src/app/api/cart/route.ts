import { getCart } from "@/lib/api/woocommerce/cart";

export async function GET(req: Request) {
  const cart = await getCart();

  return Response.json(cart);
}