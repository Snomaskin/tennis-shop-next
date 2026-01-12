import { getProductsByCategory } from "@/lib/api/woocommerce/products";

async function GET({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return getProductsByCategory(category);
}

export { GET }