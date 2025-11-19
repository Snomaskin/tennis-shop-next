import Grid from "@/components/products/Grid";
import ErrorMessage from "@/components/ErrorMessage";
import { fetchProductsBySlug, fetchAll } from "@/api/woocommerce/products";
import { createProducts } from "@/api/woocommerce/utils/products";

export default async function ProductCategory({ params }: { params: { slug: string } }) {
  try {
    const woocommerceProducts = await fetchProductsBySlug(params.slug);
    
    const products = createProducts(woocommerceProducts);

    return <Grid products={products} />;

  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return <ErrorMessage message={message} />;
  }
}
