type Props = {
  clearCart: () => void, 
//  checkoutCart: () => void, 
  onCheckout: () => void,
};

export default function Buttons({ clearCart, onCheckout }: Props) { 
  return (
    <div className="cart-footer">
      <button onClick={() => clearCart()} className="clear-cart-btn">
        Clear
      </button>
      <button onClick={() => {
      //  checkoutCart(); 
        setTimeout(() => {
        onCheckout();
        }, 200);
        }} className="checkout-btn"
      >
        Checkout
      </button>
    </div>
  );
}