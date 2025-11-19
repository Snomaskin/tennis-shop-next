import { CartItem } from "@/types/cart";
import trashIcon from "@/assets/trash.png"
import Image from "next/image";


interface Props {
    cartItem: CartItem,
    removeFromCart: (key: CartItem['key']) => void,
  };
  
export default function ItemCard({ cartItem, removeFromCart }: Props) {
    const { key, name, prices, image, quantity } = cartItem;
  
    return (
      <article className="cart-item" key={key}>
        <div className="image-wrapper">
          <Image className="product-image" src={image.src} alt={name}/>
        </div>
        <p className="price">${prices.price}</p>
        <span className="quantity">{quantity}x</span>
        <button onClick={() => removeFromCart(key)} className="rm-item-btn">
          <Image className="cart-trash-icon" src={trashIcon} alt="Remove" />
        </button>
      </article>
    );
  };