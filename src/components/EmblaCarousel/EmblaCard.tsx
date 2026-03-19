import { Product } from "@/types/products";
import Image from "next/image";
import { useState } from "react";
import ScreenOverlay from "../wrappers/ScreenOverlay";
import Card from "../products/Card";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";

export default function EmblaCard({
  product,
  onClick,
}: {
  product: Product;
  onClick?: () => void;
}) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <>
      <motion.div
        className="relative h-20 w-20 cursor-pointer overflow-hidden rounded-2xl bg-white hover:scale-105 hover:shadow-sm"
        onClick={() => {
          onClick?.();
          setIsSelected(true);
        }}
      >
        <Image
          className="rounded-2xl"
          src={product.image.src}
          alt={product.name}
          fill
        />
      </motion.div>

      <AnimatePresence>
        {isSelected && (
          <>
            {createPortal(
              <ScreenOverlay hideModal={() => setIsSelected(false)}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card
                    product={product}
                    cardStyles={{
                      classNames: "hover:translate-y-0 hover:shadow-none",
                    }}
                    footerStyles={{
                      className: "min-w-66 min-h-12",
                    }}
                  />
                </motion.div>
              </ScreenOverlay>,
              document.body,
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
