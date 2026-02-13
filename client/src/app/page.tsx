import ProductCarousel from "@/components/ProductCarousel";
import { getAllProducts } from "@/lib/api/woocommerce/products";
import { createProducts } from "@/lib/api/woocommerce/utils/products";

export default async function TennisShopLanding() {
  const products = await getAllProducts()
    .then((p) => createProducts(p))
    .catch((e) => {
      throw e;
    });
  return (
    <div>
      <ProductCarousel products={products} />
    </div>
  );
}
