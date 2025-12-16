import { Cart, WooCommerceCart } from "@/types/cart"

function createCart(rawCart: WooCommerceCart): Cart {
  return {
    items: rawCart.items.map(item => ({
      key: item.key,
      id: item.id,
      quantity: item.quantity,
      name: item.name,
      image: item.images?.[0] ?? { id: 0, src: "" },
      prices: {
        price: item.prices.price,
        regular_price: item.prices.regular_price,
        sale_price: item.prices.sale_price,
      },
    })),
    totals: { total_items: rawCart.totals.total_items},
    items_count: rawCart.items_count,
  }
}

export { createCart }