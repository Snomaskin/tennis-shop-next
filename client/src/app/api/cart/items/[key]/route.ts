import { removeItem, updateItem } from "@/lib/api/woocommerce/cart";
import type { UpdateCartItemRequest } from "@/types/api";
import { use } from "react";

export async function DELETE(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = use(params);
  const cart = await removeItem(key);
  return Response.json(cart);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = use(params);
  const { quantity }: UpdateCartItemRequest = await req.json();
  const cart = await updateItem(key, quantity);
  return Response.json(cart);
}