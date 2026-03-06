"use client";
import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import CartContainer from "./CartContainer";
import { useCartData } from "@/stores/useCart";
import NavItemWithToggle from "../NavItemWithToggle";
import cartIcon from "@/assets/cart.png";

export default function CartMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const cart = useCartData();
  const totalCart = cart?.items_count;
  const hasItems = typeof totalCart === "number" && totalCart > 0;

  return (
    <nav className="shrink-0">
      <NavItemWithToggle
        label="Cart"
        imgUrl={cartIcon}
        badge={hasItems ? totalCart : undefined}
        isOpen={isOpen}
        onClick={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
      >
        <div
          ref={cartRef}
          className={
            "relative top-2 left-1/2 -translate-x-1/2 rounded-2xl bg-white"
          }
        >
          <AnimatePresence>
            <CartContainer hideCart={() => setIsOpen(false)} />
          </AnimatePresence>
        </div>
      </NavItemWithToggle>
    </nav>
  );
}
