"use client";
import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import CartContainer from "./CartContainer";
import { useCartData } from "@/stores/useCart";
import useOutsideClick from "@/lib/utils/useOutsideClick";
import NavItemWithToggle from "../NavItemWithToggle";
import cartIcon from "@/assets/cart.png";

export default function CartMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const cart = useCartData();
  const totalCart = cart?.items_count;
  const hasItems = typeof totalCart === "number" && totalCart > 0;
  useOutsideClick(cartRef, () => setIsOpen(false));

  return (
    <nav onClick={() => setIsOpen((prev) => !prev)} className="shrink-0">
      <NavItemWithToggle
        label="Cart"
        imgUrl={cartIcon}
        badge={hasItems ? totalCart : undefined}
      >
        <div
          ref={cartRef}
          className={
            "relative top-2 left-1/2 -translate-x-1/2 rounded-2xl bg-white"
          }
        >
          <AnimatePresence>
            {isOpen && <CartContainer hideCart={() => setIsOpen(false)} />}
          </AnimatePresence>
        </div>
      </NavItemWithToggle>
    </nav>
  );
}
