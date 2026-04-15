"use client";
import { Product } from "@/types/products";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import useOutsideClick from "@/lib/utils/useOutsideClick";
import { motion, AnimatePresence } from "motion/react";
import ProductQuantityControl from "../products/Card/ProductQuantityControl";
import { twMerge } from "tailwind-merge";
import Spinner from "../loaders/Spinner";

export default function Card({
  product,
  ref,
  onSelect,
}: {
  product: Product;
  ref?: React.Ref<HTMLDivElement>;
  onSelect: (selected: boolean) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const internalRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useOutsideClick(internalRef, () => setIsExpanded(false));

  useEffect(() => {
    if (isExpanded && textRef.current) {
      const el = textRef.current;
      setIsOverflowing(
        el.scrollWidth > (el.parentElement?.offsetWidth ?? el.offsetWidth),
      );
    }
    onSelect(isExpanded);
  }, [isExpanded]);

  const setRefs = (element: HTMLDivElement | null) => {
    internalRef.current = element;
    if (typeof ref === "function") ref(element);
    else if (ref) ref.current = element;
  };

  return (
    <div
      ref={setRefs}
      className={twMerge(
        "absolute rounded-2xl hover:shadow-sm",
        isExpanded && "rounded-r-none bg-white/30 hover:shadow-none",
      )}
      style={{
        transitionDuration: "150ms",
        transform: "rotate(30deg)",
      }}
    >
      <div
        className={twMerge(
          "relative flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl duration-200 hover:scale-105",
          isExpanded && "rounded-r-none hover:scale-100",
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {!loaded && <Spinner className="h-5 w-5 border-2" />}
        <Image
          src={product.image.src}
          alt={product.name}
          fill
          className={twMerge(
            "rounded-2xl",
            loaded ? "relative opacity-100" : "absolute opacity-0",
          )}
          sizes="(max-width: 768px) 100vw, 300px"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            className="absolute top-1/2 left-1/2 h-25 w-60 flex-col gap-4 overflow-hidden rounded-r-2xl rounded-b-2xl bg-white/30 p-6 shadow-[8px_10px_10px_rgba(0,0,0,0.05)] backdrop-blur-sm"
            style={{
              pointerEvents: isExpanded ? "auto" : "none",
              zIndex: 100,
            }}
            initial={{ scale: 0.25, x: "-25%", y: "-50%", opacity: 0 }}
            animate={{ scale: 1, x: "16.5%", y: "-40.5%", opacity: 1 }}
            exit={{ scale: 0.25, x: "-25%", y: "-50%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="mb-1 w-full overflow-hidden">
              <div
                ref={textRef}
                className={twMerge(
                  "flex w-max gap-8 font-medium text-gray-800",
                  isOverflowing && "animate-marquee",
                )}
              >
                <span className="whitespace-nowrap">{product.name}</span>
                {isOverflowing && (
                  <span className="whitespace-nowrap">{product.name}</span>
                )}
              </div>
            </div>
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
