import cartIcon from "@/assets/cart.png";
import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { AnimatePresence } from "framer-motion";
import CartContainer from "./CartContainer";
import Image from "next/image";
import { useCartState } from "@/stores/useCart";

export default function CartNav() {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const { cart } = useCartState();
  const totalCart = cart?.items_count;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
          setIsSelected(false);
          setIsClicked(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseLeave = () => {
      !isClicked && setIsSelected(false);
  };

  const handleClick = () => {
      if (!isClicked) {
          setIsClicked(true);
          setIsSelected(true);
      } else { 
          setIsClicked(false);
      }
  };

  const handleHideCartUI = () => {
    setIsClicked(true);
    setIsSelected(false);
  };

  return (
    <div 
      ref={cartRef}
      className={classNames("cart-nav", {
        "is-clicked": isClicked,
        "is-hovered": isSelected && !isClicked
        })
      }
      onMouseEnter={() => setIsSelected(true)} 
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="cart-clicker"
        onClick={handleClick}
      >
        <Image className="cart-icon" src={cartIcon} alt="Cart" />
        <div className="cart-counter">{totalCart}</div>
      </div>
      <AnimatePresence>
        {isSelected === true &&
        <CartContainer hideCart={handleHideCartUI} />
        }
      </AnimatePresence>
  </div>
  );
};
