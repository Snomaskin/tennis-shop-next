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
        price: Number(item.prices.price) / 100,
        regular_price: Number(item.prices.regular_price) / 100,
        sale_price: Number(item.prices.sale_price) / 100,
      },
    })),
    totals: { 
      total_items: Number(rawCart.totals.total_items),
      total_price: Number(rawCart.totals.total_price) / 100,
    },
    items_count: rawCart.items_count,
  }
}

export { createCart }