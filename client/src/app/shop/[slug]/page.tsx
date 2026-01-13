import { Suspense } from "react";
import LoadingScreen from "@/components/loaders/LoadingScreen";
import ProductCategory from "./ProductCategory";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ProductCategory slug={slug} />
    </Suspense>
  );
}