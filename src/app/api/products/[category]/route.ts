import { getProductsByCategory } from "@/lib/api/woocommerce/products";
import { use } from "react";

async function GET({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const products = await getProductsByCategory(category);
  return Response.json(products);
}

export { GET };
