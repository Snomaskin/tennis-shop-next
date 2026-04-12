import OrderConfirmation from "@/app/checkout/components/OrderConfirmation";
import Overview from "@/app/checkout/components/Overview";
import Payment from "@/app/checkout/components/Payment";
import Review from "@/app/checkout/components/Review";
import Shipping from "@/app/checkout/components/Shipping";

export const checkoutSteps = [
  {
    id: "overview",
    label: "Overview",
    component: Overview,
  },
  {
    id: "shipping",
    label: "Shipping",
    component: Shipping,
    fields: [
      "shipping.firstName",
      "shipping.lastName",
      "shipping.street",
      "shipping.postCode",
      "shipping.city",
      "shipping.country",
    ],
  },

  {
    id: "payment",
    label: "Payment",
    component: Payment,
    fields: [
      "payment.cardHolder",
      "payment.cardNumber",
      "payment.expiryDate",
      "payment.cvv",
    ],
  },
  {
    id: "review",
    label: "Review",
    component: Review,
  },
  {
    id: "confirmation",
    label: "Order Confirmation",
    component: OrderConfirmation,
  },
];
