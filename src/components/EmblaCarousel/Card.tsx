import { Product } from "@/types/products";
import Image from "next/image";
import { useState } from "react";
import ScreenOverlay from "../wrappers/ScreenOverlay";
import FadeInOut from "../wrappers/FadeInOut";
import Card from "../products/Card";

export default function EmblaCard({ product }: { product: Product }) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <>
      <div
        className={`relative h-20 w-20 cursor-pointer overflow-hidden rounded-2xl bg-white hover:scale-105 hover:shadow-sm`}
        onClick={() => setIsSelected(true)}
      >
        <Image
          className="rounded-2xl"
          src={product.image.src}
          alt={product.name}
          fill
          unoptimized={process.env.NODE_ENV === "development"}
        />
      </div>
      {/* {isSelected && (
        <ScreenOverlay
          showModal={isSelected}
          hideModal={() => setIsSelected(false)}
        >
          <FadeInOut>
            <Card product={product} />
          </FadeInOut>
        </ScreenOverlay>
      )} */}
    </>
  );
}
