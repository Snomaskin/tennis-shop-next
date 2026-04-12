import { CheckoutFormSchema } from "@/config/checkout/schema";

export default function formatCheckout(data: CheckoutFormSchema) {
  return {
    billing_address: {
      first_name: data.shipping.firstName,
      last_name: data.shipping.lastName,
      address_1: data.shipping.street,
      address_2: "",
      city: data.shipping.city,
      state: "",
      postcode: data.shipping.postCode,
      country: "SE",
      email: "test@test.com",
      phone: "0000000000",
    },
    shipping_address: {
      first_name: data.shipping.firstName,
      last_name: data.shipping.lastName,
      address_1: data.shipping.street,
      address_2: "",
      city: data.shipping.city,
      state: "",
      postcode: data.shipping.postCode,
      country: "SE",
    },
    payment_method: "cod",
    payment_data: [],
  };
}
