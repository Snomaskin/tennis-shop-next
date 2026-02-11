type CartItem = {
  key: string;
  id: number;
  quantity: number;
  name: string;
  image: { id: number; src: string; };
  prices: {
    price: number;
    regular_price: number;
    sale_price: number;
  };
};
type Cart = {
  items: CartItem[];
  totals: {
    total_items: number;
    total_price: number;

  };
  items_count: number;
};

type WooCommerceCart = {
  items: {
    key: string;
    id: number;
    quantity: number;
    name: string;
    images: { id: number; src: string }[];
    prices: {
      price: number; 
      regular_price: number; 
      sale_price: number };
  }[];
  totals: { 
    total_items: number;
    total_price: number;
  };
  items_count: number;
};

export type { CartItem, Cart, WooCommerceCart };