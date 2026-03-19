"use client";
import { Product } from "@/types/products";
import Image from "next/image";
import { useRef, useState } from "react";
import useOutsideClick from "@/lib/utils/useOutsideClick";
import { motion, AnimatePresence } from "motion/react";
import ProductQuantityControl from "../products/Card/ProductQuantityControl";

export default function Card({
  product,
  ref,
}: {
  product: Product;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const internalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(internalRef, () => setIsExpanded(false));

  const setRefs = (element: HTMLDivElement | null) => {
    internalRef.current = element;
    if (typeof ref === "function") ref(element);
    else if (ref) ref.current = element;
  };

  return (
    <div
      ref={setRefs}
      className={`absolute hover:shadow-[10px_15px_10px_rgba(0,0,0,0.05)] ${isExpanded && "rounded-r-none border-t-[0.5px] border-l-[0.5px] shadow-[10px_15px_10px_rgba(0,0,0,0.05)]"} rounded-2xl border-gray-100`}
      style={{
        transitionDuration: "150ms",
        transform: "rotate(30deg)",
      }}
    >
      <motion.div
        className={`relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-white ${isExpanded && "rounded-r-none"}`}
        onClick={() => setIsExpanded(true)}
      >
        <Image
          className="rounded-2xl"
          src={product.image.src}
          alt={product.name}
          fill
        />
      </motion.div>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            className={`absolute top-1/2 left-1/2 h-25 w-60 flex-col gap-4 rounded-r-2xl rounded-b-2xl border-t-[0.5px] border-gray-100 bg-white p-6 shadow-[8px_10px_10px_rgba(0,0,0,0.05)]`}
            style={{
              pointerEvents: isExpanded ? "auto" : "none",
              zIndex: 100,
            }}
            initial={{ scale: 0.25, x: "-25%", y: "-50%", opacity: 0 }}
            animate={{ scale: 1, x: "16%", y: "-40.7%", opacity: 1 }}
            exit={{ scale: 0.25, x: "-25%", y: "-50%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <span className="mb-1 overflow-hidden font-medium text-nowrap text-gray-800">
              {product.name}
            </span>
            <div className="flex scale-80 gap-5">
              <p className="font-semibold text-green-600">
                ${product.prices.price.toFixed(2)}
              </p>
              <ProductQuantityControl
                product={product}
                styles={{
                  className: "scale-80",
                  classNames: { plusMinusButtons: "min-w-8" },
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
