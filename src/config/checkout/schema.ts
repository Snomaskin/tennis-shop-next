import { z } from "zod";

const shippingSchema = z.object({
  shipping: z.object({
    firstName: z.string().min(2, "First name required"),
    lastName: z.string().min(2, "Last name required"),
    street: z.string().min(5, "Street required"),
    zipCode: z
      .string()
      .transform((val) => val.replace(/\s/g, ""))
      .refine((val) => /^\d{5}$/.test(val), "Invalid zip code"),
    city: z.string().min(2),
    country: z.string().min(2),
  }),
});

const paymentSchema = z.object({
  payment: z.object({
    cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
    cardHolder: z.string().min(2),
    expiryDate: z.string(),
    cvv: z.string().regex(/^\d{3}$/),
  }),
});

const checkoutSchema = shippingSchema.extend(paymentSchema.shape);

type CheckoutFormSchema = z.infer<typeof checkoutSchema>;

const defaultCheckoutValues: CheckoutFormSchema = {
  shipping: {
    firstName: "",
    lastName: "",
    street: "",
    zipCode: "",
    city: "",
    country: "",
  },
  payment: {
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  },
};

const autoFillValues: CheckoutFormSchema = {
  shipping: {
    firstName: "Kalle",
    lastName: "Anka",
    street: "Långbensvägen 3",
    zipCode: "994 63",
    city: "Ankeborg",
    country: "Sverige",
  },
  payment: {
    cardNumber: "1000010000100001",
    cardHolder: "Kalle Anka",
    expiryDate: "12 / 27",
    cvv: "123",
  },
};

export {
  shippingSchema,
  paymentSchema,
  checkoutSchema,
  type CheckoutFormSchema,
  defaultCheckoutValues,
  autoFillValues,
};
