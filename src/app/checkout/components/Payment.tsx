import CheckoutForm from "./CheckoutForm";

export default function Payment() {
  return (
    <CheckoutForm
      stepName="payment"
      title="Payment"
      description="Please enter your payment details below"
    />
  );
}
