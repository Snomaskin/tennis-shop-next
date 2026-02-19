import { getWooCart } from "@/lib/api/woocommerce/cart";
import { getOrSetCartCookie } from "@/lib/cartSession";

export async function GET(req: Request) {
  const session = await getOrSetCartCookie();
  const cart = await getWooCart(session);

  return Response.json(cart);
}