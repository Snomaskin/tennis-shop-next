
import type { Cart } from "@/types/cart";
import ItemCard from "./ItemCard";
import Buttons from "./Buttons";
import FadeInOut from "@/components/wrappers/FadeInOut";
import { useCartActions } from "@/stores/useCart";

export default function Cart({ cart, onCheckout }: { cart: Cart, onCheckout: () => void }) {
  const { removeItem, clearCart } = useCartActions();

  return (
    <FadeInOut className="cart">
      <ul className="cart-items">
        {cart.items.map((item) => (
          <li key={item.id}>
            <ItemCard 
              cartItem={item}
              removeFromCart={removeItem}
            />
          </li>
        ))}
      </ul>
      <Buttons 
        clearCart={clearCart} 
        onCheckout={onCheckout} 
      />
    </FadeInOut>
  )
}