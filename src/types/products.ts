type Product = {
  id: number;
  name: string;
  image: { id: number; src: string; };
  on_sale: boolean;
  prices: {
    price: number;
    regular_price: number;
    sale_price: number;
  };
};

type WooCommerceProduct = {
  id: number;
  name: string;
  images: { id: number; src: string }[];
  on_sale: boolean;
  prices: { 
    price: number; 
    regular_price: number; 
    sale_price: number };
  };

  type Category = {
    id: number,
    name: string,
    slug: string,
    description: string,
    image: {
      src: string,
      name: string
    }
  }

export type { Product, WooCommerceProduct, Category };