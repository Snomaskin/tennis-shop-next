import { getProductsByCategory } from "@/lib/api/woocommerce/products";
import { use } from "react";

async function GET({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  return getProductsByCategory(category);
}

export { GET }