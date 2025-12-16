import { Suspense } from "react";
import LoadingScreen from "@/components/loaders/LoadingScreen";
import ProductCategory from "./ProductCategory";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ProductCategory params={params} />
    </Suspense>
  );
}