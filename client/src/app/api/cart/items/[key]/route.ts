import { removeItem, updateItem } from "@/lib/api/woocommerce/cart";
import type { UpdateCartItemRequest } from "@/types/api";

export async function DELETE(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const cart = await removeItem(key);
  return Response.json(cart);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const { quantity }: UpdateCartItemRequest = await req.json();
  const cart = await updateItem(key, quantity);
  return Response.json(cart);
}