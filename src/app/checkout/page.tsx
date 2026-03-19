"use client";
import { useForm, FormProvider } from "react-hook-form";
import { useCheckout } from "./hooks/useCheckout";
import { checkoutSteps } from "@/config/checkout/checkoutSteps";
import ky, { HTTPError } from "ky";
import {
  checkoutSchema,
  CheckoutFormSchema,
  defaultCheckoutValues,
} from "@/config/checkout/checkoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { CheckoutResponseBody } from "@/types/api";
import { useCartReset } from "@/stores/useCart";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const methods = useForm<CheckoutFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(checkoutSchema),
    defaultValues: defaultCheckoutValues,
  });
  const {
    stepIndex,
    setCheckoutRes,
    setCheckoutError,
    reset: resetCheckout,
  } = useCheckout();
  const resetCart = useCartReset();
  const CurrentStepComponent = checkoutSteps[stepIndex].component;
  const pathname = usePathname();
  const hasLeft = pathname !== "/checkout";

  const onSubmit = async (data: CheckoutFormSchema) => {
    try {
      const res = await ky
        .post("api/checkout", { json: data })
        .json<CheckoutResponseBody>();
      setCheckoutRes(res);
    } catch (err) {
      if (err instanceof HTTPError) {
        const body = await err.response.json();
        setCheckoutError(body.message ?? "Unknown error", err.response.status);
      }
    }
  };

  useEffect(() => {
    return () => {
      resetCheckout();
      resetCart();
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="bg-amber-100">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <CurrentStepComponent />
          </motion.div>
        </AnimatePresence>
      </form>
    </FormProvider>
  );
}
