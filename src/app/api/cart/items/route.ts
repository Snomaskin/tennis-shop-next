import { withErrorHandling } from "@/lib/api/utils/withErrorHandling";
import { addWooItem } from "@/lib/api/woocommerce/cart";
import { getOrSetCartCookie } from "@/lib/cartSession";
import type { AddToWooCartRequest } from "@/types/api";

export async function POST(req: Request) {
  return withErrorHandling(async () => {
    const session = await getOrSetCartCookie();
    const { productId, quantity }: AddToWooCartRequest = await req.json();
    const cart = await addWooItem(productId, quantity, session);
    return Response.json(cart);
  });
}
