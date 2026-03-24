import { useCartActions, useCartState } from "@/stores/useCart";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/products";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  product: Product | CartItem;
  styles?: {
    className?: string;
    classNames?: {
      container?: string;
      addButton?: string;
      plusMinusButtons?: string;
      input?: string;
    };
  };
};

export default function ProductQuantityControl({
  product,
  styles = {},
}: Props) {
  const { cart, fetchStatus } = useCartState();
  const { addItem, updateItemQuantity, removeItem } = useCartActions();

  const cartItem = cart?.items.find((item) => item.id === product.id);
  const [inputValue, setInputValue] = useState<string>("");

  const handleUpdateQuantity = (quantityChange: number) => {
    if (cartItem && quantityChange <= 0) {
      removeItem(cartItem.key);
    } else if (cartItem) {
      updateItemQuantity(cartItem.key, quantityChange);
    }
  };

  const handleAddItem = () => {
    addItem(product.id);
  };

  useEffect(() => {
    setInputValue(String(cartItem?.quantity ?? ""));
  }, [cartItem?.quantity]);

  const { className, classNames } = styles;
  const plusMinusStyles = twMerge(
    "flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-600 transition-all hover:bg-white hover:shadow-sm active:scale-90 shrink-0",
    classNames?.plusMinusButtons,
  );

  return (
    <div
      className={twMerge("relative mt-auto w-full overflow-hidden", className)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {!cartItem ? (
          <motion.button
            className={twMerge(
              "w-full cursor-pointer rounded-xl bg-emerald-400 py-2 font-medium text-white transition-colors hover:bg-emerald-700 active:scale-95",
              classNames?.addButton,
            )}
            onClick={handleAddItem}
            disabled={fetchStatus === "loading"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            Add to cart
          </motion.button>
        ) : (
          <motion.div
            key={cartItem.key}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-1"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.15 }}
          >
            <button
              className={plusMinusStyles}
              onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
              disabled={fetchStatus === "loading"}
            >
              <Minus size={16} />
            </button>
            <div className="overflow-hidden">
              <motion.input
                key={cartItem.quantity}
                className={twMerge(
                  "w-full bg-transparent text-center text-sm font-semibold text-gray-800 outline-none",
                )}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (e.target.value !== "")
                    handleUpdateQuantity(Number(e.target.value));
                }}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
              />
            </div>
            <button
              className={plusMinusStyles}
              onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
              disabled={fetchStatus === "loading"}
            >
              <Plus size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
