import Grid from "@/components/products/Grid";
import ErrorMessage from "@/components/ErrorMessage";
import { getProductsByCategory } from "@/lib/api/woocommerce/products";
import { createProducts } from "@/lib/api/woocommerce/utils/products";

export default async function ProductCategory({ slug }: { slug: string }) {
  try {
    const woocommerceProducts = await getProductsByCategory(slug);
    const products = createProducts(woocommerceProducts);

    return <Grid products={products} />;

  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return <ErrorMessage message={message} />;
  }
}
