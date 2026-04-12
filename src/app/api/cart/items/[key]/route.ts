import { removeWooItem, updateWooItem } from "@/lib/api/woocommerce/cart";
import type { UpdateWooCartItemRequest } from "@/types/api";
import { getOrSetCartCookie } from "@/lib/sessions/cart";
import { withErrorHandling } from "@/lib/api/utils/withErrorHandling";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  return withErrorHandling(async () => {
    const { key } = await params;
    const session = await getOrSetCartCookie();
    const cart = await removeWooItem(key, session);
    return NextResponse.json(cart);
  });
}

export async function PATCH(req: Request) {
  return withErrorHandling(async () => {
    const body = await req.json();
    const { key, quantity }: UpdateWooCartItemRequest = body;
    const session = await getOrSetCartCookie();
    const cart = await updateWooItem(key, quantity, session);
    return NextResponse.json(cart);
  });
}
