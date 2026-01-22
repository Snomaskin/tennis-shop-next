import { removeWooItem, updateWooItem } from "@/lib/api/woocommerce/cart";
import type { UpdateWooCartItemRequest } from "@/types/api";
import { getOrSetCartCookie } from "@/lib/cartSession";
import { use } from "react";

export async function DELETE(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = use(params);
  const session = await getOrSetCartCookie();
  const cart = await removeWooItem(key, session);
  return Response.json(cart);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = use(params);
  const body = await req.json();
  const { quantity }: UpdateWooCartItemRequest = body;
  const session = await getOrSetCartCookie();
  const cart = await updateWooItem(key, quantity, session);
  return Response.json(cart);
}