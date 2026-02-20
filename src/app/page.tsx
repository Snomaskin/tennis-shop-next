import ProductCarousel from "@/components/ProductCarousel";
import { getAllProducts } from "@/lib/api/woocommerce/products";

export default async function TennisShopLanding() {
  const products = await getAllProducts(30);

  return (
    <div>
      <ProductCarousel products={products} />
    </div>
  );
}
