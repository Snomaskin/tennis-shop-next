import { Product } from "@/types/products";
import Card from "./Card";

export default function Grid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 bg-amber-100 px-4 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}
