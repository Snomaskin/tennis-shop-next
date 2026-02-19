import { Product } from "@/types/products";
import Card from "./Card";

export default function Grid({ products }: { products: Product[] }) {
  return (
    <div className="pt-24 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {
        products.map(product => (
          <Card key={product.id} product={product} />
        ))
      }
    </div>
  )
}