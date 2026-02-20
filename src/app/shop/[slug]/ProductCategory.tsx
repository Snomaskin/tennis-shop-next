import Grid from "@/components/products/Grid";
import ErrorMessage from "@/components/ErrorMessage";
import { getProductsByCategory } from "@/lib/api/woocommerce/products";

export default async function ProductCategory({ slug }: { slug: string }) {
  try {
    const products = await getProductsByCategory(slug);
    return <Grid products={products} />;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return <ErrorMessage message={message} />;
  }
}
