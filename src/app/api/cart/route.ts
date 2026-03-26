import { withErrorHandling } from "@/lib/api/utils/withErrorHandling";
import { getWooCart } from "@/lib/api/woocommerce/cart";
import { getOrSetCartCookie } from "@/lib/cartSession";

export async function GET() {
  return withErrorHandling(async () => {
    const session = await getOrSetCartCookie();
    const cart = await getWooCart(session);
    return Response.json(cart);
  });
}
