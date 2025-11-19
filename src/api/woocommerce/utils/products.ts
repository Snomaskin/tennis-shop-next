import type { Product, WooCommerceProduct } from "@/types/products";

function createProducts(rawProducts: WooCommerceProduct[]): Product[] {
  return (rawProducts.map(item => ({
    id: item.id,
    name: item.name,
    image: item.images?.[0] ?? { id: 0, src: "" },
    on_sale: item.on_sale,
    prices: {
      price: item.prices.price / 100,
      regular_price: item.prices.regular_price,
      sale_price: item.prices.sale_price,
    },
  })));
}

export { createProducts }