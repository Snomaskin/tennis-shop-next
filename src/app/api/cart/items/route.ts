import { withErrorHandling } from "@/lib/api/utils/withErrorHandling";
import { addWooItem } from "@/lib/api/woocommerce/cart";
import { getOrSetCartCookie } from "@/lib/sessions/cart";
import type { AddToWooCartRequest } from "@/types/api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return withErrorHandling(async () => {
    const session = await getOrSetCartCookie();
    const { productId, quantity }: AddToWooCartRequest = await req.json();
    const cart = await addWooItem(productId, quantity, session);
    return NextResponse.json(cart);
  });
}
