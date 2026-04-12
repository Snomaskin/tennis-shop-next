import { withErrorHandling } from "@/lib/api/utils/withErrorHandling";
import { getWooCart } from "@/lib/api/woocommerce/cart";
import { getOrSetCartCookie } from "@/lib/sessions/cart";
import { NextResponse } from "next/server";

export async function GET() {
  return withErrorHandling(async () => {
    const session = await getOrSetCartCookie();
    const cart = await getWooCart(session);
    return NextResponse.json(cart);
  });
}
