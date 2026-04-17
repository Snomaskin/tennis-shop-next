import CheckoutForm from "./CheckoutForm";

export default function Payment() {
  return (
    <CheckoutForm
      stepName="payment"
      title="Payment"
      description="Auto-fill here too, if you want. We won't judge."
    />
  );
}
