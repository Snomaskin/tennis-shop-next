import TennisCourt from "@/components/backgrounds/TennisCourt";
import ProductCarousel from "@/components/ProductCarousel";
import { getAllProducts } from "@/lib/api/woocommerce/products";

export default async function TennisShopLanding() {
  const products = await getAllProducts(30);

  return (
    <div className="relative min-h-screen overflow-hidden bg-amber-100">
      <TennisCourt />

      <div className="absolute top-[100px] z-20 hidden w-full flex-col items-center sm:flex">
        <div className="flex flex-col items-center rounded-full px-6 py-4 pb-6 shadow-xl outline-2 outline-gray-100/60 backdrop-blur-sm">
          <p className="mb-1 font-['Doto',serif] text-xs font-semibold tracking-[0.4em] text-amber-900/60 uppercase select-none">
            Welcome to
          </p>

          <h1 className="text-center font-['Doto',sans-serif] text-[clamp(3rem,4vw,7rem)] font-black tracking-[-0.02em] text-nowrap text-yellow-100 italic select-none [text-shadow:0_2px_0_rgba(0,0,0,0.18),0_8px_40px_rgba(0,0,0,0.28),0_0_80px_rgba(255,255,255,0.12)]">
            Tennis Shop Next
          </h1>
        </div>
      </div>

      <div className="relative z-10">
        <ProductCarousel products={products} />
      </div>
    </div>
  );
}
